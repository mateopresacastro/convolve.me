import { useContext } from 'react';
import { getAudioBufferFromFile } from '../lib/audioUtils';
import { MyAudioContext } from '../contexts/MyAudioContext';
import { RxUpload, RxCheck } from 'react-icons/rx';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { AudioBuffersState } from '../App';

export interface FileInputProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  audioBuffers: AudioBuffersState;
  label: string;
  id: 'firstSample' | 'secondSample';
}

const FileInput = ({
  setAudioBuffers,
  audioBuffers,
  label,
  id,
}: FileInputProps) => {
  const ctx = useContext(MyAudioContext);

  const handleSampleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const sample = e.target.files[0];
    const decodedAudio = await getAudioBufferFromFile(sample, ctx);
    setAudioBuffers((audioBuffers) => ({
      ...audioBuffers,
      [e.target.id]: decodedAudio,
    }));
  };

  const isBufferReady = audioBuffers[id] !== null;

  return (
    <section className="z-20 mx-14 mb-10">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-zinc-900 transition duration-700 ease-in-out hover:bg-zinc-800">
        <label htmlFor={id} aria-label={label}>
          {isBufferReady ? (
            <RxCheck className="h-5 w-5 cursor-pointer text-red-100" />
          ) : (
            <RxUpload className="h-4 w-4 cursor-pointer text-red-100" />
          )}
          <input
            className="hidden"
            id={id}
            type="file"
            accept="audio/*"
            onChange={handleSampleChange}
          />
        </label>
      </div>
    </section>
  );
};

export default FileInput;
