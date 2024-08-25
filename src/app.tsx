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
      <div></div>
      <div className="flex flex-col items-start justify-center">
        <LayoutGroup>
          <Title />
          <motion.div className="md:min-w-[664px] flex w-full min-w-[350px] flex-col items-center justify-center pt-1">
            <motion.div className="md:min-h-[150px] mb-10 mt-6 flex flex-col items-center justify-between gap-6 md:mb-10 md:flex-row">
              {fileInputData.map((data, i) => (
                <motion.div
                  key={data.id}
                  className={clsx(
                    "flex flex-col items-center justify-center",
                    i == 0 && "mb-4 md:mb-0"
                  )}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{ ...transition, delay: 0.24 + i * 0.12 }}
                >
                  <LayoutGroup key={data.id}>
                    <WaveForm sample={audioBuffers[data.id]} id={data.id} />
                    <FileInput label={data.label} id={data.id} />
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
