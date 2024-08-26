export type AudioBuffersState = {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
};

export type Id = "firstSample" | "secondSample";

export type Label = "Sample One" | "Sample Two";

export type TFileInput = {
  label: Label;
  id: Id;
};
