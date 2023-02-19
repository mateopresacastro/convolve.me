const fileInputData = [
  {
    label: 'Upload Sample One',
    id: 'firstSample' as 'firstSample',
  },
  {
    label: 'Upload Sample Two',
    id: 'secondSample' as 'secondSample',
  },
];
const audioBuffersDefaultValues = {
  firstSample: new AudioBuffer({
    length: 1,
    numberOfChannels: 1,
    sampleRate: 41000,
  }),
  secondSample: new AudioBuffer({
    length: 1,
    numberOfChannels: 1,
    sampleRate: 41000,
  }),
};

export { fileInputData, audioBuffersDefaultValues };
