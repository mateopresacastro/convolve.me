import { useState } from "react";
import {
  AnimatePresence,
  motion,
  LazyMotion,
  domAnimation,
} from "framer-motion";
import FileInput from "./components/file-input";
import ConvolveButton from "./components/convolve-button";
import Layout from "./components/layout";
import { fileInputData } from "./lib/default_data";
import GitHubLink from "./components/github-link";
import WaveForm from "./components/wave-form";
import Title from "./components/title";
import { transition, variants } from "./lib/animations";
import clsx from "clsx";

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
    <LazyMotion features={domAnimation}>
      <Layout>
        <div></div>
        <motion.div className="flex flex-col items-start justify-center" layout>
          <Title />
          <motion.div
            className="flex w-full flex-col items-center justify-center pt-1"
            layout
          >
            <motion.div
              className="mb-10 mt-6 flex flex-col items-center justify-center gap-6 md:mb-10 md:flex-row"
              layout
            >
              {fileInputData.map((data, i) => (
                <motion.div
                  key={data.id}
                  className={clsx(
                    "flex flex-col items-center justify-center",
                    i == 0 && "md:mb-0 mb-4"
                  )}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{ ...transition, delay: 0.24 + i * 0.12 }}
                  layoutId={data.id}
                  layout
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
            </motion.div>
            <ConvolveButton
              audioBuffers={audioBuffers}
              setAudioBuffers={setAudioBuffers}
            />
          </motion.div>
        </motion.div>
        <GitHubLink />
      </Layout>
    </LazyMotion>
  );
}
