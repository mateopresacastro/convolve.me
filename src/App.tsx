import { useState } from 'react';
import Blob from './components/Blob';
import FileInput from './components/FileInput';
import ConvolveButton from './components/ConvolveButton';
import Layout from './components/Layout';
import Title from './components/Title';
import { fileInputData } from './lib/defaultData';
import GitHubLink from './components/GitHubLink';

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

const App = () => {
  const [audioBuffers, setAudioBuffers] = useState<AudioBuffersState>({
    firstSample: null,
    secondSample: null,
  });

  return (
    <Layout>
      <Blob />
      <div className="mb-10 flex items-center justify-center">
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
      <GitHubLink />
    </Layout>
  );
};

export default App;
