"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { variants, transition } from "@/lib/animations";
import { fileInputData } from "@/lib/default-data";
import { audioBuffersAtom } from "@/lib/jotai";

import FileInput from "@/components/file-input";
import GitHubLink from "@/components/github-link";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import WaveForm from "@/components/wave-form";

export interface AudioBuffersState {
  firstSample: AudioBuffer | null;
  secondSample: AudioBuffer | null;
}

export default function App() {
  const audioBuffers = useAtomValue(audioBuffersAtom);

  return (
    <>
      <div className="flex max-w-[664px] flex-col items-start justify-between">
        <LayoutGroup>
          <Title />
          <motion.div className="flex h-72 w-80 flex-col items-center justify-center md:h-28 md:w-[640px]">
            <motion.div className=" flex w-full flex-col items-center justify-evenly gap-7 md:flex-row">
              {fileInputData.map((data, i) => (
                <motion.div
                  key={data.id}
                  className={clsx(
                    "flex h-28 w-full items-center justify-center"
                  )}
                  variants={variants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  transition={{ ...transition, delay: 0.48 + i * 0.12 }}
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
          </motion.div>
          <motion.div className="flex h-24 w-full items-center justify-center">
            <StartButton />
          </motion.div>
        </LayoutGroup>
      </div>
      <GitHubLink />
    </>
  );
}
