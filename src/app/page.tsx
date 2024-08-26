"use client";

import { LayoutGroup, motion, MotionConfig } from "framer-motion";

import GitHubLink from "@/components/github-link";
import StartButton from "@/components/start-button";
import Title from "@/components/title";
import Input from "@/components/input";

import type { TFileInput } from "@/types";

const inputs: Array<TFileInput> = [
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
  return (
    <MotionConfig
      transition={{
        duration: 0.65,
        type: "spring",
        bounce: 0.3,
        filter: { transition: { bounce: 0 } },
      }}
    >
      <div className="flex max-w-[664px] flex-col items-start justify-between">
        <Title />
        <div className="flex h-72 w-[21rem] flex-col items-center justify-center md:h-28 md:w-[640px]">
          <motion.div className="flex w-full flex-col items-center justify-evenly gap-7 md:flex-row">
            {inputs.map(({ id, label }, i) => (
              <LayoutGroup key={`layout-group-${id}-wrapper`}>
                <Input key={id} label={label} id={id} i={i} />
              </LayoutGroup>
            ))}
          </motion.div>
        </div>
        <StartButton />
      </div>
      <GitHubLink />
    </MotionConfig>
  );
}
