import { atom } from "jotai";

export const audioBuffersAtom = atom({
  firstSample: null,
  secondSample: null,
});

export const audioCtxAtom = atom<AudioContext | null>(null);

export const isRecordingAtom = atom({
  firstSample: false,
  secondSample: false,
});
