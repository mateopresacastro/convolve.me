import { ChangeEvent, useState } from 'react';

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
      <section>
        <input
          type="file"
          accept="audio/*"
          onChange={handleSampleChange1}
          className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
        />
      </section>
      <section>
        <input
          type="file"
          accept="audio/*"
          onChange={handleSampleChange2}
          className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
        />
      </section>
      <button
        onClick={handleConvolve}
        className="rounded-md bg-blue-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-gray-100"
      >
        Convolve
      </button>
    </main>
  );
};

export default Main;
