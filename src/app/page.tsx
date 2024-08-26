"use client";

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
    <>
      <div className="flex max-w-[664px] flex-col items-start justify-between">
        <Title />
        <div className="flex h-72 w-[21rem] flex-col items-center justify-center md:h-28 md:w-[640px]">
          <div className="flex w-full flex-col items-center justify-evenly gap-7 md:flex-row">
            {inputs.map(({ id, label }, i) => (
              <Input key={id} label={label} id={id} i={i} />
            ))}
          </div>
        </div>
        <StartButton />
      </div>
      <GitHubLink />
    </>
  );
}
