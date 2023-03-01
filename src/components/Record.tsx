import { useContext, useState, useRef, Dispatch, SetStateAction } from 'react';
import { AudioBuffersState } from '../App';
import { MyAudioContext } from '../contexts/MyAudioContext';
import { getAudioBufferFromFile } from '../lib/audioUtils';
import { BsFillRecordFill } from 'react-icons/bs';

interface RecordProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  id: 'firstSample' | 'secondSample';
}

const Record = ({ id, setAudioBuffers }: RecordProps) => {
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

  return isRecording ? (
    <BsFillRecordFill
      className="h-5 w-5 animate-pulse cursor-pointer text-red-500 transition duration-300 ease-in-out hover:text-red-400"
      onClick={stopRecording}
    />
  ) : (
    <BsFillRecordFill
      className="h-5 w-5 cursor-pointer text-red-800 transition duration-300 ease-in-out hover:text-red-500"
      onClick={record}
    />
  );
};

export default Record;
