import { ChangeEvent, useState } from 'react';
import Blob from './Blob';
import FileInput from './FileInput';
import ConvolveButton from './ConvolveButton';
import { fileInputData } from '../fileInputData';
const Main = () => {
  // set default values for the audio buffers that will hold the samples
  const [audioBuffers, setAudioBuffers] = useState({
    firstSample: new AudioBuffer({
      length: 1,
      numberOfChannels: 1,
      sampleRate: 41000,
    }),
    secondSample: new AudioBuffer({
      length: 1,
      numberOfChannels: 1,
      sampleRate: 41000,
    }),
  });

  // create audio context and utilities
  const [ctx] = useState(new AudioContext());
  const compressor = new DynamicsCompressorNode(ctx, { ratio: 20 });
  const gain = new GainNode(ctx, { gain: 0.5 });
  const out = ctx.destination;

  const handleSampleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const sample = e.target.files[0];
    const decodedAudio = await getAudioBufferFromFile(sample);
    setAudioBuffers((audioBuffers) => ({
      ...audioBuffers,
      [e.target.id]: decodedAudio,
    }));
  };

  const getAudioBufferFromFile = async (sample: File) => {
    const sampleUrl = URL.createObjectURL(sample);
    const res = await fetch(sampleUrl);
    const buffer = await res.arrayBuffer();
    return ctx.decodeAudioData(buffer);
  };

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
    <main className="flex h-full flex-col items-center justify-center bg-zinc-900">
      <Blob />
      {fileInputData.map((data) => (
        <FileInput
          handleSampleChange={handleSampleChange}
          label={data.label}
          id={data.id}
          key={data.id}
        />
      ))}
      <p className="mt-1 mb-5 text-sm text-gray-500">
        All audio files allowed. Must be 41000 Hz.
      </p>
      <ConvolveButton handleConvolve={handleConvolve} />
    </main>
  );
};

export default Main;
