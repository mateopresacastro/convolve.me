import { Dispatch, SetStateAction } from "react";
import { AudioBuffersState } from "../../app";
import Record from "./control_buttons/record";
import PlayStop from "./control_buttons/play-stop";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

interface PlayerProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  audioBuffers: AudioBuffersState;
  id: "firstSample" | "secondSample";
}

export default function Player({
  id,
  setAudioBuffers,
  audioBuffers,
}: PlayerProps) {
  return (
    <motion.div className="mx-6 flex gap-2">
      <LayoutGroup id={`${id}-player-layout`}>
        <AnimatePresence mode="wait">
          {audioBuffers[id] ? (
            <PlayStop id={id} audioBuffers={audioBuffers} />
          ) : null}
        </AnimatePresence>
        <Record id={id} setAudioBuffers={setAudioBuffers} />
      </LayoutGroup>
    </motion.div>
  );
}
