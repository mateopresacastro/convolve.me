const getAudioUtils = (ctx: AudioContext | OfflineAudioContext) => {
  const compressor = new DynamicsCompressorNode(ctx, { ratio: 20 });
  const gain = new GainNode(ctx, { gain: 0.5 });
  const out = ctx.destination;
  return { compressor, gain, out };
};

const getAudioBufferFromFile = async (sample: File, ctx: AudioContext) => {
  const sampleUrl = URL.createObjectURL(sample);
  const res = await fetch(sampleUrl);
  const buffer = await res.arrayBuffer();
  return ctx.decodeAudioData(buffer);
};

export { getAudioUtils, getAudioBufferFromFile };
