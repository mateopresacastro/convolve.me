import { useState } from 'react';
import { getAudioUtils, audioBufferToWave } from '../lib/audioUtils';
import { AudioBuffersState } from '../types/types';
import download from '../lib/download';
import Processing from './Processing';

const ConvolveButton = ({ audioBuffers }: AudioBuffersState) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const { firstSample, secondSample } = audioBuffers;

  const offlineCtx = new OfflineAudioContext({
    numberOfChannels: firstSample.numberOfChannels,
    length: 44100 * 60,
    sampleRate: 44100,
  });

  const handleConvolve = async () => {
    const { compressor, gain, out } = getAudioUtils(offlineCtx);

    const firstSampleSourceNode = new AudioBufferSourceNode(offlineCtx, {
      buffer: firstSample,
    });

    const convolverNode = new ConvolverNode(offlineCtx, {
      buffer: secondSample,
    });

    firstSampleSourceNode
      .connect(convolverNode)
      .connect(gain)
      .connect(compressor)
      .connect(out);

    try {
      firstSampleSourceNode.start();
      setIsProcessing(true);
      const renderedBuffer = await offlineCtx.startRendering();
      const { waveFile, error } = await audioBufferToWave(renderedBuffer);
      if (error) throw error;
      download(waveFile!);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return isProcessing ? (
    <Processing />
  ) : isError ? (
    <button
      onClick={() => setIsError(false)}
      type="submit"
      className="z-20 w-52 rounded-md bg-red-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm transition duration-500 ease-in-out hover:bg-red-200 hover:text-red-900"
    >
      Something went wrong
    </button>
  ) : (
    <button
      onClick={handleConvolve}
      type="submit"
      className="z-20 w-52 rounded-md bg-gray-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm transition duration-500 ease-in-out hover:bg-zinc-300 hover:text-zinc-800"
    >
      Convolve
    </button>
  );
};

export default ConvolveButton;
