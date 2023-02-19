import { useState } from 'react';
import Blob from './Blob';
import FileInput from './FileInput';
import ConvolveButton from './ConvolveButton';
import Layout from './Layout';
import { fileInputData, audioBuffersDefaultValues } from '../lib/defaultData';
import Title from './Title';

const Main = () => {
  const [audioBuffers, setAudioBuffers] = useState(audioBuffersDefaultValues);

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
