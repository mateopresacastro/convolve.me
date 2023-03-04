import { useContext, useState, useRef, Dispatch, SetStateAction } from 'react';
import { AudioBuffersState } from '../../../App';
import { MyAudioContext } from '../../../contexts/MyAudioContext';
import { getAudioBufferFromFile } from '../../../lib/audio_utils';
import { BsFillRecordFill } from 'react-icons/bs';

interface RecordProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  id: 'firstSample' | 'secondSample';
}

export default function Record({ id, setAudioBuffers }: RecordProps) {
  const ctx = useContext(MyAudioContext);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const record = async () => {
    try {
      if (navigator.mediaDevices) {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(mediaStream);
        const audioChunks: Blob[] = [];

        mediaRecorder.ondataavailable = async (e) => {
          audioChunks.push(e.data);
        };

        mediaRecorder.onerror = () => {
          throw new Error('Error recording audio from mic');
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
  };

  return (
    <BsFillRecordFill
      className={`h-5 w-5 ${
        isRecording
          ? ` animate-[pulse_0.5s_ease-in-out_infinite] text-red-500`
          : `text-zinc-900  hover:text-zinc-500`
      } cursor-pointer transition duration-300 ease-in-out`}
      onClick={isRecording ? stopRecording : record}
    />
  );
}
