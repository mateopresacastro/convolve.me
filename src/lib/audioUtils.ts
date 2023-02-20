const recorderWorker = new Worker(
  new URL('./recorderWorker.js', import.meta.url)
);

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

interface audioBufferToWaveReturn {
  error: Error | null;
  waveFile: Blob | null;
}

const audioBufferToWave = (
  audioBuffer: AudioBuffer
): Promise<audioBufferToWaveReturn> => {
  return new Promise((resolve, reject) => {
    // initialize the new worker
    recorderWorker.postMessage({
      command: 'init',
      config: { sampleRate: 44100 },
    });

    // send the channel data from our buffer to the worker
    recorderWorker.postMessage({
      command: 'record',
      buffer: [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)],
    });

    recorderWorker.postMessage({
      command: 'exportWAV',
      type: 'audio/wav',
    });

    // callback for `exportWAV`
    recorderWorker.onmessage = (e) => {
      resolve({ error: null, waveFile: e.data as Blob });
    };

    recorderWorker.onerror = (error) => {
      reject({
        error: new Error('Error while rendering to WAVE', { cause: error }),
        waveFile: null,
      });
    };
  });
};

export { getAudioUtils, getAudioBufferFromFile, audioBufferToWave };
