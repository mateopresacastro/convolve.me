import { atom } from "jotai";
import { AudioBuffersState } from "../app";

export const audioBuffersAtom = atom<AudioBuffersState>({
  firstSample: null,
  secondSample: null,
});

export const audioCtxAtom = atom<AudioContext>(new AudioContext());
