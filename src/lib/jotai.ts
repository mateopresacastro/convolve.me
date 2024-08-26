import { atom } from "jotai";

interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

export const audioBuffersAtom = atom<AudioBuffersState>({
  firstSample: null,
  secondSample: null,
});

export const audioCtxAtom = atom<AudioContext | null>(null);

interface IsRecordingState {
  firstSample: boolean;
  secondSample: boolean;
}

export const isRecordingAtom = atom<IsRecordingState>({
  firstSample: false,
  secondSample: false,
});
