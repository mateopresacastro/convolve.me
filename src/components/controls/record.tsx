import clsx from "clsx";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Inter } from "next/font/google";
import { useAtom } from "jotai";

import { audioAtom, isRecordingAtom } from "@/lib/jotai";
import { getAudioBufferFromFile } from "@/lib/audio-utils";

import type { Id } from "@/types";

const inter = Inter({ subsets: ["latin"] });

interface RecordProps {
  id: Id;
}

export default function Record({ id }: RecordProps) {
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  const [audioBuffers, setAudioBuffers] = useAtom(audioAtom);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const currentBuffer = audioBuffers[id];

  const record = async () => {
    try {
      if (!navigator.mediaDevices) return;
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(mediaStream);
      const audioChunks: Blob[] = [];

      setAudioBuffers((audioBuffers) => ({
        ...audioBuffers,
        [id]: null,
      }));

      mediaRecorder.ondataavailable = async ({ data }) => {
        audioChunks.push(data);
      };

      mediaRecorder.onerror = () => {
        setIsRecording((prev) => ({ ...prev, [id]: false }));
      };

      mediaRecorder.onstop = async () => {
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
        setIsRecording((prev) => ({ ...prev, [id]: false }));
        const blob = new Blob(audioChunks);
        const decodedAudio = await getAudioBufferFromFile(blob);
        setAudioBuffers((prev) => ({
          ...prev,
          [id]: decodedAudio,
        }));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording((prev) => ({ ...prev, [id]: true }));
    } catch (error) {
      console.log(error);
      setIsRecording((prev) => ({ ...prev, [id]: false }));
    }
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current = null;
  };

  if (id === "waveFile" || id === "result") return null;
  const isCurrentlyRecording = isRecording[id];

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      {!currentBuffer ? (
        <motion.div layoutId={`center-control-${id}`} className="relative">
          <motion.svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            whileHover={{ scale: isCurrentlyRecording ? 3.3 : 1.2 }}
            whileTap={{ scale: isCurrentlyRecording ? 3 : 1 }}
            exit={{ opacity: 0, filter: "blur(2px)" }}
            initial={{ opacity: 0, filter: "blur(1px)" }}
            animate={{
              opacity: isCurrentlyRecording ? [0.5, 1] : 1,
              filter: "blur(0px)",
              scale: isCurrentlyRecording ? 3 : 1,
              color: isCurrentlyRecording ? "#dc2626" : "#171717",
            }}
            className={clsx(
              "h-6 w-6 cursor-pointer text-neutral-900 hover:text-neutral-500 focus:outline-none ml-1"
            )}
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
            onClick={isCurrentlyRecording ? stopRecording : record}
          >
            <path
              fillRule="evenodd"
              d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"
            ></path>
          </motion.svg>
          <motion.p
            exit={{ opacity: 0, filter: "blur(2px)" }}
            animate={{
              y: isCurrentlyRecording ? -14 : 0,
              color: isCurrentlyRecording ? "#FFFFF" : "#171717",
            }}
            className={clsx(
              inter.className,
              "absolute text-[0.4rem] left-[0.635rem]"
            )}
          >
            REC
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
