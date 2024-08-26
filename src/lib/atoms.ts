import { atom } from "jotai";
import type { AudioBuffersState, IsRecordingState } from "@/types";

export const audioAtom = atom<AudioBuffersState>({
  firstSample: null,
  secondSample: null,
  result: null,
  waveFile: null,
});

export const isRecordingAtom = atom<IsRecordingState>({
  firstSample: false,
  secondSample: false,
});

export const sourceNodeAtom = atom<AudioBufferSourceNode | null>(null);
export const audioContextAtom = atom<AudioContext | null>(null);
