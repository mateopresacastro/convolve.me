import clsx from "clsx";
import { useState, useRef } from "react";
import { getAudioBufferFromFile } from "../../../lib/audio-utils";
import { motion } from "framer-motion";
import { audioBuffersAtom, audioCtxAtom } from "../../../lib/jotai";
import { useAtomValue, useSetAtom } from "jotai";

interface RecordProps {
  id: "firstSample" | "secondSample";
}

export default function Record({ id }: RecordProps) {
  const ctx = useAtomValue(audioCtxAtom);
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setAudioBuffers = useSetAtom(audioBuffersAtom);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const record = async () => {
    try {
      if (!navigator.mediaDevices) return;
      setIsLoading(true);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const mediaRecorder = new MediaRecorder(mediaStream);
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = async (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onerror = () => {
        throw new Error("Error recording audio from mic");
      };

      mediaRecorder.onstop = async () => {
        const tracks = mediaStream.getTracks();
        tracks.forEach((track) => track.stop());
        setIsRecording(false);
        const decodedAudio = await getAudioBufferFromFile(
          new Blob(audioChunks),
          ctx
        );
        setAudioBuffers((audioBuffers) => ({
          ...audioBuffers,
          [id]: decodedAudio,
        }));
      };

      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  return (
    <motion.div layoutId={`record-icon-${id}`}>
      <motion.svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 16 16"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1 }}
        animate={
          isRecording
            ? {
                opacity: [0.5, 1],
                color: "red",
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }
            : isLoading
            ? { opacity: 0.5, color: "red" }
            : { opacity: 1, color: "currentColor" }
        }
        className={clsx(
          "h-6 w-6 cursor-pointer text-neutral-900 hover:text-neutral-500  focus:outline-none"
        )}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        onClick={isRecording ? stopRecording : record}
      >
        <path fillRule="evenodd" d="M8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10z"></path>
      </motion.svg>
    </motion.div>
  );
}
