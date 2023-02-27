const fileInputData = [
  {
    label: 'Sample One',
    id: 'firstSample' as 'firstSample',
  },
  {
    label: 'Sample Two',
    id: 'secondSample' as 'secondSample',
  },
];

const audioBuffersDefaultValues = {
  firstSample: new AudioBuffer({
    length: 1,
    numberOfChannels: 2,
    sampleRate: 44100,
  }),
  secondSample: new AudioBuffer({
    length: 1,
    numberOfChannels: 2,
    sampleRate: 44100,
  }),
};

export { fileInputData, audioBuffersDefaultValues };
