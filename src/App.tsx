import { useState } from 'react';
import Blob from './components/Blob';
import FileInput from './components/FileInput';
import ConvolveButton from './components/ConvolveButton';
import Layout from './components/Layout';
import { fileInputData } from './lib/defaultData';
import GitHubLink from './components/GitHubLink';
import WaveForm from './components/WaveForm.js';

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
      <div className="mb-10 flex items-center justify-center">
        {fileInputData.map((data) => (
          <div key={data.id}>
            <FileInput
              audioBuffers={audioBuffers}
              setAudioBuffers={setAudioBuffers}
              label={data.label}
              id={data.id}
            />
            <WaveForm id={data.id} audioBuffers={audioBuffers} />
          </div>
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
