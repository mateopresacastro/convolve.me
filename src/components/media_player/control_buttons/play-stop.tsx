import clsx from "clsx";
import { useContext, useRef, useState } from "react";
import { BsFillPlayFill, BsFillStopFill } from "react-icons/bs";
import { AudioBuffersState } from "../../../app";
import { MyAudioContext } from "../../../contexts/my-audio-context";

interface PlayStopProps {
  audioBuffers: AudioBuffersState;
  id: "firstSample" | "secondSample";
}

export default function PlayStop({ audioBuffers, id }: PlayStopProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctx = useContext(MyAudioContext);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  const playSample = () => {
    if (audioBuffers[id] && !isPlaying) {
      setIsPlaying(true);
      const sampleSourceNode = new AudioBufferSourceNode(ctx, {
        buffer: audioBuffers[id],
      });
      sourceNodeRef.current = sampleSourceNode;
      sampleSourceNode.connect(ctx.destination);
      sampleSourceNode.start();
      sampleSourceNode.onended = () => setIsPlaying(false);
    }
  };

  const stopSample = () => {
    if (sourceNodeRef.current && isPlaying) {
      sourceNodeRef.current.stop();
    }
  };

  return (
    <>
      <BsFillPlayFill
        className={clsx(
          "h-4 w-4 cursor-pointer",
          isPlaying
            ? ` text-green-500`
            : ` text-neutral-900 hover:text-neutral-500`
        )}
        onClick={playSample}
      />
      <BsFillStopFill
        className="h-4 w-4 cursor-pointer  text-neutral-900 hover:text-neutral-500"
        onClick={stopSample}
      />
    </>
  );
}
