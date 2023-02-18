import { ChangeEvent, useState } from 'react';
import Blob from './Blob';

const ctx = new AudioContext();
const out = ctx.destination;
let sampleSourceNode: AudioBufferSourceNode;
const compressor = new DynamicsCompressorNode(ctx, { ratio: 20 });



const Main = () => {
  const [sampleBuffer, setSampleBuffer] = useState(
    new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: 41000 })
  );
  const [sampleBuffer2, setSampleBuffer2] = useState(
    new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: 41000 })
  );

  const handleSampleChange1 = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const sample = e.target.files[0];
    const sampleUrl = URL.createObjectURL(sample);
    const res = await fetch(sampleUrl);
    const buffer = await res.arrayBuffer();
    const decodedAudio = await ctx.decodeAudioData(buffer);
    setSampleBuffer(decodedAudio);
  };

  const handleSampleChange2 = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const sample = e.target.files[0];
    const sampleUrl = URL.createObjectURL(sample);
    const res = await fetch(sampleUrl);
    const buffer = await res.arrayBuffer();
    const decodedAudio = await ctx.decodeAudioData(buffer);
    setSampleBuffer2(decodedAudio);
  };

  const handleConvolve = () => {
    const convolverNode = new ConvolverNode(ctx, { buffer: sampleBuffer2 });
    sampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: sampleBuffer,
    });
    sampleSourceNode.connect(convolverNode).connect(compressor).connect(out);
    sampleSourceNode.start();
  };
  return (
    <main className="flex h-full flex-col items-center justify-center bg-zinc-900">
      <Blob />
      <section className="z-20">
        <label
          className="mb-2 block text-sm font-medium text-gray-500"
          htmlFor="file_input"
        >
          Upload Sample One
        </label>
        <input
          className="block w-96 cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="audio/*"
          onChange={handleSampleChange1}
        />
      </section>
      <section className="z-20">
        <label
          className="mb-2 mt-5 block text-sm font-medium text-gray-500 "
          htmlFor="file_input"
        >
          Upload Sample Two
        </label>
        <input
          className="block w-96 cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          aria-describedby="file_input_help"
          id="file_input"
          type="file"
          accept="audio/*"
          onChange={handleSampleChange2}
        />
        <p className="mt-1 mb-5 text-sm text-gray-500" id="file_input_help">
          All audio files allowed. Must be 41000 Hz.
        </p>
      </section>
      <button
        onClick={handleConvolve}
        className="z-20 rounded-md bg-gray-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-gray-100"
      >
        Convolve
      </button>
    </main>
  );
};

export default Main;
