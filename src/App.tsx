import { useState } from 'react';
import FileInput from './components/FileInput';
import ConvolveButton from './components/ConvolveButton';
import Layout from './components/Layout';
import { fileInputData } from './lib/defaultData';
import GitHubLink from './components/GitHubLink';
import WaveForm from './components/WaveForm';
import BigWaveForm from './components/BigWaveForm';

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

const App = () => {
  const [audioBuffers, setAudioBuffers] = useState<AudioBuffersState>({
    firstSample: null,
    secondSample: null,
  });
  const [convolvedSampleWaveFile, setConvolvedSampleWaveFile] =
    useState<Blob | null>(null);

  return (
    <Layout>
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
            <WaveForm id={data.id} audioBuffers={audioBuffers} />
          </div>
        ))}
      </div>
      <ConvolveButton
        audioBuffers={audioBuffers}
        setAudioBuffers={setAudioBuffers}
        setConvolvedSampleWaveFile={setConvolvedSampleWaveFile}
      />
      {/* <BigWaveForm convolvedSampleWaveFile={convolvedSampleWaveFile} /> */}
      <GitHubLink />
    </Layout>
  );
};

export default App;
