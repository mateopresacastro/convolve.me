import { useContext, ChangeEvent } from "react";
import { getAudioBufferFromFile } from "../lib/audio-utils";
import { audioBuffersAtom, audioCtxAtom, isRecordingAtom } from "../lib/jotai";
import Player from "./media_player/player";
import TrashButton from "./trash-button";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useAtom, useAtomValue } from "jotai";

export interface FileInputProps {
  label: string;
  id: "firstSample" | "secondSample";
}

export default function FileInput({ label, id }: FileInputProps) {
  const ctx = useAtomValue(audioCtxAtom);
  const [audioBuffers, setAudioBuffers] = useAtom(audioBuffersAtom);
  const isRecording = useAtomValue(isRecordingAtom);

  const handleSampleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const sample = e.target.files[0];
    const decodedAudio = await getAudioBufferFromFile(sample, ctx);
    setAudioBuffers((audioBuffers) => ({
      ...audioBuffers,
      [e.target.id]: decodedAudio,
    }));
  };

  const deleteAudioBuffer = () => {
    if (!audioBuffers[id]) return;
    setAudioBuffers((audioBuffers) => ({
      ...audioBuffers,
      [id]: null,
    }));
  };

  return (
    <LayoutGroup id={`${id}-file-input`}>
      <motion.section
        className="flex h-10 w-full items-center justify-evenly"
        layoutId={`${id}-file-input`}
      >
        <AnimatePresence>
          {!isRecording[id] ? (
            <motion.label
              htmlFor={id}
              aria-label={label}
              layoutId={`${id}-file-input-label`}
              exit={{ opacity: 0, filter: "blur(2px)" }}
            >
              <motion.svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 15 15"
                whileHover={{
                  scale: 1.2,
                  color: "#0284c7",
                }}
                whileTap={{ scale: 1 }}
                animate={{
                  color: "#a3a3a3",
                }}
                className="ml-3 h-4 w-4 cursor-pointer text-neutral-400 focus:outline-none"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: "9999px" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
                  fill="currentColor"
                ></path>
              </motion.svg>
              <motion.input
                className="hidden"
                id={id}
                type="file"
                accept="audio/*"
                onChange={handleSampleChange}
              />
            </motion.label>
          ) : null}
        </AnimatePresence>
        <Player
          id={id}
          setAudioBuffers={setAudioBuffers}
          audioBuffers={audioBuffers}
        />
        <AnimatePresence mode="wait">
          {audioBuffers[id] ? (
            <TrashButton
              id={id}
              deleteAudioBuffer={deleteAudioBuffer}
              audioBuffers={audioBuffers}
            />
          ) : null}
        </AnimatePresence>
      </motion.section>
    </LayoutGroup>
  );
}
