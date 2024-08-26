"use client";

import clsx from "clsx";
import { LayoutGroup, motion } from "framer-motion";
import { useAtomValue } from "jotai";

import { variants, transition } from "@/lib/animations";
import { audioBuffersAtom } from "@/lib/jotai";

import FileInput from "@/components/file-input";
import GitHubLink from "@/components/github-link";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import WaveForm from "@/components/wave-form";

import type { FileInputData } from "@/types";

const fileInputData: FileInputData[] = [
  {
    label: "Sample One",
    id: "firstSample",
  },
  {
    label: "Sample Two",
    id: "secondSample",
  },
];

export default function App() {
  const audioBuffers = useAtomValue(audioBuffersAtom);

  return (
    <>
      <LayoutGroup>
        <div className="flex max-w-[664px] flex-col items-start justify-between">
          <Title />
          <div className="flex h-72 w-[21rem] flex-col items-center justify-center md:h-28 md:w-[640px]">
            <div className="flex w-full flex-col items-center justify-evenly gap-7 md:flex-row">
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
                    <div className="flex flex-col items-center justify-center">
                      <WaveForm sample={audioBuffers[data.id]} id={data.id} />
                      <FileInput label={data.label} id={data.id} />
                    </div>
                  </LayoutGroup>
                </motion.div>
              ))}
            </div>
          </div>
          <StartButton />
        </div>
        <GitHubLink />
      </LayoutGroup>
    </>
  );
}
