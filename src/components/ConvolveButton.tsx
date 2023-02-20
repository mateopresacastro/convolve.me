import { useState } from 'react';
import { getAudioUtils } from '../lib/audioUtils';
import { AudioBuffersState } from '../types/types';
import download from '../lib/download';
import Processing from './Processing';

const ConvolveButton = ({ audioBuffers }: AudioBuffersState) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConvolve = async () => {
    const { firstSample, secondSample } = audioBuffers;

    const offlineCtx = new OfflineAudioContext({
      numberOfChannels: firstSample.numberOfChannels,
      length: 44100 * 60,
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

    firstSampleSourceNode.start();
    setIsProcessing(true);
    const renderedBuffer = await offlineCtx.startRendering();
    const didDownload = await download(renderedBuffer);
    setIsProcessing(didDownload === true && false);
  };

  return isProcessing ? (
    <Processing />
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
