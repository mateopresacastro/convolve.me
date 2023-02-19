import { ChangeEvent, useState } from 'react';
import Blob from './Blob';
import FileInput from './FileInput';
import ConvolveButton from './ConvolveButton';
import Layout from './Layout';
import { fileInputData, audioBuffersDefaultValues } from '../lib/defaultData';
import { getAudioUtils, getAudioBufferFromFile } from '../lib/audioUtils';

const Main = () => {
  const [audioBuffers, setAudioBuffers] = useState(audioBuffersDefaultValues);

  const [ctx] = useState(new AudioContext());
  const { compressor, gain, out } = getAudioUtils(ctx);

  const handleSampleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const sample = e.target.files[0];
    const decodedAudio = await getAudioBufferFromFile(sample, ctx);
    setAudioBuffers((audioBuffers) => ({
      ...audioBuffers,
      [e.target.id]: decodedAudio,
    }));
  };

  const handleConvolve = () => {
    const { firstSample, secondSample } = audioBuffers;
    const firstSampleSourceNode = new AudioBufferSourceNode(ctx, {
      buffer: firstSample,
    });
    const convolverNode = new ConvolverNode(ctx, {
      buffer: secondSample,
    });

    firstSampleSourceNode
      .connect(convolverNode)
      .connect(gain)
      .connect(compressor)
      .connect(out);
    firstSampleSourceNode.start();
  };

  return (
    <Layout>
      <Blob />
      {fileInputData.map((data) => (
        <FileInput
          handleSampleChange={handleSampleChange}
          label={data.label}
          id={data.id}
          key={data.id}
        />
      ))}
      <ConvolveButton handleConvolve={handleConvolve} />
    </Layout>
  );
};

export default Main;
