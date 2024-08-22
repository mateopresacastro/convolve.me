import { Dispatch, SetStateAction } from "react";
import { AudioBuffersState } from "../../App";
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
    <div className="mx-3 flex">
      <PlayStop id={id} audioBuffers={audioBuffers} />
      <Record id={id} setAudioBuffers={setAudioBuffers} />
    </div>
  );
}
