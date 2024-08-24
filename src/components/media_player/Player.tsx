import { Dispatch, SetStateAction } from "react";
import { AudioBuffersState } from "../../app";
import Record from "./control_buttons/record";
import PlayStop from "./control_buttons/play-stop";

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
    <div className="mx-6 gap-2 flex">
      <PlayStop id={id} audioBuffers={audioBuffers} />
      <Record id={id} setAudioBuffers={setAudioBuffers} />
    </div>
  );
}
