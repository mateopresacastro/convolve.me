"use client";

import { LayoutGroup, motion, MotionConfig } from "framer-motion";

import GitHubLink from "@/components/github";
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
        type: "spring",
        bounce: 0.4,
        filter: { transition: { bounce: 0 } },
      }}
    >
      <Title />
      <div className="flex w-full flex-col items-center md:flex-row md:gap-0 gap-6 py-6 md:py-0">
        {inputs.map(({ id, label }, i) => (
          <Input key={id} label={label} id={id} i={i} />
        ))}
      </div>
      <StartButton />
      <GitHubLink />
    </MotionConfig>
  );
}
