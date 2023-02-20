import { useState } from 'react';
import Blob from './Blob';
import FileInput from './FileInput';
import ConvolveButton from './ConvolveButton';
import Layout from './Layout';
import Title from './Title';
import { fileInputData } from '../lib/defaultData';

const Main = () => {
  const [audioBuffers, setAudioBuffers] = useState<{
    firstSample: AudioBuffer | null;
    secondSample: AudioBuffer | null;
  }>({
    firstSample: null,
    secondSample: null,
  });

  return (
    <Layout>
      <Blob />
      <Title />
      {fileInputData.map((data) => (
        <FileInput
          setAudioBuffers={setAudioBuffers}
          label={data.label}
          id={data.id}
          key={data.id}
        />
      ))}
      <ConvolveButton audioBuffers={audioBuffers} />
    </Layout>
  );
};

export default Main;
