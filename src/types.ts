export type Id = "firstSample" | "secondSample" | "result" | "waveFile";

export type AudioBuffersState = {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
  result: AudioBuffer | null;
  waveFile: Blob | null;
};

export type TFileInput = {
  label: string;
  id: Id;
};

export type IsRecordingState = {
  firstSample: boolean;
  secondSample: boolean;
};
