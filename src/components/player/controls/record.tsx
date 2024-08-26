import clsx from "clsx";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { useAtom, useSetAtom } from "jotai";
import type { Id } from "@/types";
import { audioCtxAtom, audioBuffersAtom, isRecordingAtom } from "@/lib/jotai";
import { getAudioBufferFromFile } from "@/lib/audio-utils";

interface RecordProps {
  id: Id;
}

export default function Record({ id }: RecordProps) {
  const [isRecording, setIsRecording] = useAtom(isRecordingAtom);
  const setAudioBuffers = useSetAtom(audioBuffersAtom);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const record = async () => {
    try {
      if (!navigator.mediaDevices) return;
      setAudioBuffers((audioBuffers) => ({
        ...audioBuffers,
        [id]: null,
      }));

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = async (e) => {
        audioChunks.push(e.data);
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

  const isCurrentlyRecording = isRecording[id];

  return (
    <motion.div layoutId={`record-icon-${id}`} className="relative">
      <motion.svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        animate={
          isCurrentlyRecording
            ? {
                color: "red",
                scale: 1.3,
              }
            : { color: "currentColor" }
        }
        className={clsx(
          "h-6 w-6 cursor-pointer text-neutral-900 hover:text-neutral-500 focus:outline-none"
        )}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        onClick={isCurrentlyRecording ? stopRecording : record}
      >
        <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"></path>
      </motion.svg>
      <p className="absolute text-[0.4rem] left-[0.37rem]">REC</p>
    </motion.div>
  );
}
