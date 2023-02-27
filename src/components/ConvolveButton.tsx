import { useState, Dispatch, SetStateAction } from 'react';
import { getAudioUtils, audioBufferToWave } from '../lib/audioUtils';
import download from '../lib/download';
import Processing from './Processing';

interface ConvolveButtonProps {
  audioBuffers: {
    firstSample: AudioBuffer | null;
    secondSample: AudioBuffer | null;
  };
  setAudioBuffers: Dispatch<
    SetStateAction<{
      firstSample: AudioBuffer | null;
      secondSample: AudioBuffer | null;
    }>
  >;
}

const ConvolveButton = ({
  audioBuffers,
  setAudioBuffers,
}: ConvolveButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isError, setIsError] = useState(false);

  const { firstSample, secondSample } = audioBuffers;

  const handleConvolve = async () => {
    if (firstSample && secondSample) {
      // create offline context to render audio
      const offlineCtx = new OfflineAudioContext({
        numberOfChannels: firstSample.numberOfChannels,
        length: firstSample.length + secondSample.length,
        sampleRate: 44100,
      });

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
        setAudioBuffers({ firstSample: null, secondSample: null });
      }
    }
  };

  return isProcessing ? (
    <Processing />
  ) : isError ? (
    <button
      onClick={() => setIsError(false)}
      type="submit"
      className="z-20 w-52 rounded-md bg-red-800 px-3.5 py-1.5 text-sm text-white shadow-sm transition duration-700 ease-in-out hover:bg-red-700"
    >
      Something went wrong
    </button>
  ) : (
    <button
      onClick={handleConvolve}
      type="submit"
      className="z-20 w-52 rounded-md bg-zinc-900 px-3.5 py-1.5 text-sm text-white shadow-sm transition duration-700 ease-in-out hover:bg-zinc-800"
    >
      Convolve
    </button>
  );
};

export default ConvolveButton;
