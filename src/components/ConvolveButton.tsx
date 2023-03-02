import { useState } from 'react';
import { getAudioUtils, audioBufferToWave } from '../lib/audioUtils';
import download from '../lib/download';
import Processing from './Processing';
import type { Dispatch, SetStateAction } from 'react';
import type { AudioBuffersState } from '../App';

interface ConvolveButtonProps {
  audioBuffers: AudioBuffersState;
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  setConvolvedSampleWaveFile: Dispatch<SetStateAction<Blob | null>>;
}

const ConvolveButton = ({
  audioBuffers,
  setAudioBuffers,
  setConvolvedSampleWaveFile,
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

      // create nodes
      const firstSampleSourceNode = new AudioBufferSourceNode(offlineCtx, {
        buffer: firstSample,
      });

      const convolverNode = new ConvolverNode(offlineCtx, {
        buffer: secondSample,
      });

      // connect the tree
      firstSampleSourceNode
        .connect(convolverNode)
        .connect(gain)
        .connect(compressor)
        .connect(out);

      firstSampleSourceNode.start();

      try {
        setIsProcessing(true);
        const renderedBuffer = await offlineCtx.startRendering();
        const waveFile = await audioBufferToWave(renderedBuffer);
        setConvolvedSampleWaveFile(waveFile);
        download(waveFile);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsProcessing(false);
        setAudioBuffers((audioBuffers) => ({
          ...audioBuffers,
          firstSample: null,
          secondSample: null,
        }));
      }
    }
  };

  const isDisabled =
    audioBuffers.firstSample === null || audioBuffers.secondSample === null;

  return isProcessing ? (
    <Processing />
  ) : isError ? (
    <button
      onClick={() => setIsError(false)}
      type="submit"
      className="z-20 w-52 rounded-md bg-red-800 px-3.5 py-1.5 text-sm text-zinc-100 shadow-md transition duration-700 ease-in-out hover:bg-red-700"
    >
      Something went wrong
    </button>
  ) : (
    <>
      <button
        onClick={handleConvolve}
        disabled={isDisabled}
        className={`${
          isDisabled
            ? `cursor-not-allowed bg-zinc-300 text-zinc-500`
            : `cursor-pointer bg-sky-600 text-zinc-100 hover:bg-sky-800`
        } z-30 w-52 rounded-md px-3.5 py-1.5 text-sm  shadow-md transition duration-300 ease-in-out`}
      >
        <h1>{isDisabled ? 'Upload samples or record' : 'Convolve Samples'}</h1>
      </button>
    </>
  );
};

export default ConvolveButton;
