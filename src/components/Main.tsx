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
      <main className="mb-10 flex">
        {fileInputData.map((data) => (
          <FileInput
            audioBuffers={audioBuffers}
            setAudioBuffers={setAudioBuffers}
            label={data.label}
            id={data.id}
            key={data.id}
          />
        ))}
      </main>
      <ConvolveButton
        audioBuffers={audioBuffers}
        setAudioBuffers={setAudioBuffers}
      />
    </Layout>
  );
};

export default Main;
