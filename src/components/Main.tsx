import React, { useState } from 'react';

const ctx = new AudioContext();
const out = ctx.destination;
let sampleSourceNode: AudioBufferSourceNode;

const Main = () => {
  const [sampleBuffer, setSampleBuffer] = useState(
    new AudioBuffer({ length: 1, numberOfChannels: 1, sampleRate: 41000 })
  );

  const handleSampleChange = async (e) => {
    const sample = e.target.files[0];
    const sampleUrl = URL.createObjectURL(sample);
    const res = await fetch(sampleUrl);
    const buffer = await res.arrayBuffer();
    const decodedAudio = await ctx.decodeAudioData(buffer);
    setSampleBuffer(decodedAudio);
  };

  const play = () => {
    sampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: sampleBuffer,
    });
    sampleSourceNode.connect(out);
    sampleSourceNode.start();
  };

  const pause = () => {
    sampleSourceNode.stop();
  };

  return (
    <main className="flex h-full items-center justify-center bg-zinc-900">
      <button
        onClick={play}
        className="rounded-md bg-green-600 px-3.5 py-1.5 text-base font-semibold text-white first-line:shadow-sm hover:bg-gray-100"
      >
        Play
      </button>
      <button
        onClick={pause}
        className="rounded-md bg-red-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-gray-100"
      >
        Pause
      </button>
      <section>
        <input
          type="file"
          accept="audio/*"
          onChange={handleSampleChange}
          className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold text-gray-900 shadow-sm hover:bg-gray-100"
        />
      </section>
    </main>
  );
};

export default Main;
