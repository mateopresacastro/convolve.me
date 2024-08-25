import { LayoutGroup, motion } from "framer-motion";
import FileInput from "./components/file-input";
import Layout from "./components/layout";
import { fileInputData } from "./lib/default-data";
import GitHubLink from "./components/github-link";
import WaveForm from "./components/wave-form";
import Title from "./components/title";
import { transition, variants } from "./lib/animations";
import clsx from "clsx";
import { useAtom, useAtomValue } from "jotai";
import { audioBuffersAtom } from "./lib/jotai";
import StartButton from "./components/start-button";

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

export default function App() {
  const audioBuffers = useAtomValue(audioBuffersAtom);

  return (
    <Layout>
      <div />
      <div className="flex flex-col items-start justify-center">
        <LayoutGroup>
          <Title />
          <motion.div className="flex w-full min-w-[350px] flex-col items-center justify-center pt-1 md:min-w-[664px]">
            <motion.div className="relative flex w-full flex-col items-center justify-between gap-6 md:min-h-[150px] md:flex-row">
              {fileInputData.map((data, i) => (
                <motion.div
                  key={data.id}
                  className={clsx(
                    "flex h-28 w-full items-center justify-center",
                    i == 0 && "mb-4 md:mb-0"
                  )}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{ ...transition, delay: 0.24 + i * 0.12 }}
                >
                  <LayoutGroup key={data.id}>
                    <motion.div className="flex flex-col items-center justify-center">
                      <WaveForm sample={audioBuffers[data.id]} id={data.id} />
                      <FileInput label={data.label} id={data.id} />
                    </motion.div>
                  </LayoutGroup>
                </motion.div>
              ))}
            </motion.div>
            <StartButton />
          </motion.div>
        </LayoutGroup>
      </div>
      <GitHubLink />
    </Layout>
  );
}
