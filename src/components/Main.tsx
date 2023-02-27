import { useState } from 'react';
import Blob from './Blob';
import FileInput from './FileInput';
import ConvolveButton from './ConvolveButton';
import Layout from './Layout';
import Title from './Title';
import { fileInputData } from '../lib/defaultData';

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

const Main = () => {
  const [audioBuffers, setAudioBuffers] = useState<AudioBuffersState>({
    firstSample: null,
    secondSample: null,
  });

  return (
    <Layout>
      <Blob />
      <Title />
      <div className="mb-10 flex">
        {fileInputData.map((data) => (
          <FileInput
            audioBuffers={audioBuffers}
            setAudioBuffers={setAudioBuffers}
            label={data.label}
            id={data.id}
            key={data.id}
          />
        ))}
      </div>
      <ConvolveButton
        audioBuffers={audioBuffers}
        setAudioBuffers={setAudioBuffers}
      />
    </Layout>
  );
};

export default Main;
