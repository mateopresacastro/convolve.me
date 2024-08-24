import { BsFillTrashFill } from "react-icons/bs";
import clsx from "clsx";
import type { AudioBuffersState } from "../app";

interface TrashButtonProps {
  deleteAudioBuffer: () => void;
  id: "firstSample" | "secondSample";
  audioBuffers: AudioBuffersState;
}
export default function TrashButton({
  deleteAudioBuffer,
  id,
  audioBuffers,
}: TrashButtonProps) {
  return (
    <BsFillTrashFill
      className={clsx(
        audioBuffers[id] ? "hover:text-red-600" : "hover:text-neutral-700",
        "mr-3 h-3 w-3 cursor-pointer text-neutral-400 transition duration-300 ease-in-out"
      )}
      onClick={deleteAudioBuffer}
    />
  );
}
