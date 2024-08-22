import { useState } from "react";
import FileInput from "./components/file-input";
import ConvolveButton from "./components/convolve-button";
import Layout from "./components/layout";
import { fileInputData } from "./lib/default_data";
import GitHubLink from "./components/github-link";
import WaveForm from "./components/wave-form";
import Title from "./components/title";

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

export default function App() {
  const [audioBuffers, setAudioBuffers] = useState<AudioBuffersState>({
    firstSample: null,
    secondSample: null,
  });

  return (
    <Layout>
      <Title />
      <div className="flex flex-col items-center justify-center rounded-lg bg-zinc-50 p-10 shadow-sm">
        <div className="mb-10 flex flex-col items-center justify-center md:flex-row">
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
}
