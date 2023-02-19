import { useContext } from 'react';
import { getAudioUtils } from '../lib/audioUtils';
import { MyAudioContext } from '../contexts/MyAudioContext';
import { AudioBuffersState } from '../types/types';

const ConvolveButton = ({ audioBuffers }: AudioBuffersState) => {
  const ctx = useContext(MyAudioContext);
  const { compressor, gain, out } = getAudioUtils(ctx);

  const handleConvolve = () => {
    const { firstSample, secondSample } = audioBuffers;
    const firstSampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: firstSample,
    });
    const convolverNode = new ConvolverNode(ctx, {
      buffer: secondSample,
    });

    firstSampleSourceNode
      .connect(convolverNode)
      .connect(gain)
      .connect(compressor)
      .connect(out);

    firstSampleSourceNode.start();
  };

  return (
    <button
      onClick={handleConvolve}
      type="submit"
      className="z-20 rounded-md bg-gray-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm transition duration-500 ease-in-out hover:text-zinc-800 hover:bg-zinc-300"
    >
      Convolve
    </button>
  );
};

export default ConvolveButton;
