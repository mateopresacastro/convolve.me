export type Id = "firstSample" | "secondSample" | "result" | "waveFile";

export type AudioBuffersState = {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
  result: AudioBuffer | null;
  waveFile: Blob | null;
};

export type Label = "Sample One" | "Sample Two";

export type TFileInput = {
  label: Label;
  id: Id;
};

export type IsRecordingState = {
  firstSample: boolean;
  secondSample: boolean;
};
