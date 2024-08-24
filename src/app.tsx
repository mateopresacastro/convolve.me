import { useState } from "react";
import FileInput from "./components/file-input";
import ConvolveButton from "./components/convolve-button";
import Layout from "./components/layout";
import { fileInputData } from "./lib/default_data";
import GitHubLink from "./components/github-link";
import WaveForm from "./components/wave-form";
import Title from "./components/title";
import { motion } from "framer-motion";
import { transition, variants } from "./lib/animations";

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
      <div></div>
      <div className="flex flex-col items-start justify-center">
        <Title />
        <div className="flex flex-col items-center justify-center pt-1">
          <div className="mb-10 mt-6 flex flex-col items-center justify-center gap-6 md:flex-row">
            {fileInputData.map((data, i) => (
              <motion.div
                key={data.id}
                className="flex flex-col items-center justify-center"
                variants={variants}
                initial="hidden"
                animate="show"
                transition={{ ...transition, delay: 0.24 + i * 0.12 }}
              >
                <WaveForm sample={audioBuffers[data.id]} />
                <FileInput
                  audioBuffers={audioBuffers}
                  setAudioBuffers={setAudioBuffers}
                  label={data.label}
                  id={data.id}
                />
              </motion.div>
            ))}
          </div>
          <ConvolveButton
            audioBuffers={audioBuffers}
            setAudioBuffers={setAudioBuffers}
          />
        </div>
      </div>
      <GitHubLink />
    </Layout>
  );
}
