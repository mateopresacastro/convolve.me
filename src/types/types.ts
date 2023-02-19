export interface FileInputProps {
  setAudioBuffers: React.Dispatch<
    React.SetStateAction<{
      firstSample: AudioBuffer;
      secondSample: AudioBuffer;
    }>
  >;
  label: string;
  id: 'firstSample' | 'secondSample';
}

export interface AudioBuffersState {
  audioBuffers: { firstSample: AudioBuffer; secondSample: AudioBuffer };
}
