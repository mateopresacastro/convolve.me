"use client"

/**
 * Ported and modified from: https://github.com/mattdiamond/Recorderjs and
 * licensed (MIT)
 */

let recLength = 0;
let recBuffersL: Float32Array[] = [];
let recBuffersR: Float32Array[] = [];
let sampleRate: number;

self.onmessage = (e) => {
  switch (e.data.command) {
    case "init":
      init(e.data.config);
      break;
    case "record":
      record(e.data.buffer);
      break;
    case "exportWAV":
      exportWAV(e.data.type);
      break;
    case "getBuffer":
      getBuffer();
      break;
    case "clear":
      clear();
      break;
  }
};

function init(config: { sampleRate: number }) {
  sampleRate = config.sampleRate;
}

function record(inputBuffer: Float32Array[]) {
  recBuffersL.push(inputBuffer[0]);
  recBuffersR.push(inputBuffer[1]);
  recLength += inputBuffer[0].length;
}

function exportWAV(type: string) {
  const bufferL = mergeBuffers(recBuffersL, recLength);
  const bufferR = mergeBuffers(recBuffersR, recLength);
  const interleaved = interleave(bufferL, bufferR);
  const dataview = encodeWAV(interleaved);
  const audioBlob = new Blob([dataview], { type: type });

  self.postMessage(audioBlob);
}

function getBuffer() {
  const buffers = [];
  buffers.push(mergeBuffers(recBuffersL, recLength));
  buffers.push(mergeBuffers(recBuffersR, recLength));
  self.postMessage(buffers);
}

function clear() {
  recLength = 0;
  recBuffersL = [];
  recBuffersR = [];
}

function mergeBuffers(recBuffers: Float32Array[], recLength: number) {
  const result = new Float32Array(recLength);
  let offset = 0;
  for (let i = 0; i < recBuffers.length; i++) {
    result.set(recBuffers[i], offset);
    offset += recBuffers[i].length;
  }
  return result;
}

function interleave(inputL: Float32Array, inputR: Float32Array) {
  const length = inputL.length + inputR.length;
  const result = new Float32Array(length);

  let index = 0;
  let inputIndex = 0;

  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function floatTo16BitPCM(
  output: DataView,
  offset: number,
  input: Float32Array
) {
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function encodeWAV(samples: Float32Array) {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, "RIFF");
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * 2, true);
  /* RIFF type */
  writeString(view, 8, "WAVE");
  /* format chunk identifier */
  writeString(view, 12, "fmt ");
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, 1, true);
  /* channel count */
  view.setUint16(22, 2, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * 4, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, 4, true);
  /* bits per sample */
  view.setUint16(34, 16, true);
  /* data chunk identifier */
  writeString(view, 36, "data");
  /* data chunk length */
  view.setUint32(40, samples.length * 2, true);

  floatTo16BitPCM(view, 44, samples);

  return view;
}
