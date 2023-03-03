import { useState } from 'react';
import FileInput from './components/FileInput';
import ConvolveButton from './components/ConvolveButton';
import Layout from './components/Layout';
import { fileInputData } from './lib/defaultData';
import GitHubLink from './components/GitHubLink';
import WaveForm from './components/WaveForm';
import Title from './components/Title';

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
      <Title />
      <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 p-10 shadow-lg">
        <div className="mb-10 flex items-center justify-center">
          {fileInputData.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center justify-center"
            >
              <FileInput
                audioBuffers={audioBuffers}
                setAudioBuffers={setAudioBuffers}
                label={data.label}
                id={data.id}
              />
              <WaveForm sample={audioBuffers[data.id]} />
            </div>
          ))}
        </div>
        <ConvolveButton
          audioBuffers={audioBuffers}
          setAudioBuffers={setAudioBuffers}
        />
      </div>
      <GitHubLink />
    </Layout>
  );
};

export default App;
