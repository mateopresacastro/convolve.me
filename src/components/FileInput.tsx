import { useContext } from 'react';
import { RxUpload, RxCheck } from 'react-icons/rx';
import Record from './MediaPlayer/Record';
import { getAudioBufferFromFile } from '../lib/audioUtils';
import { MyAudioContext } from '../contexts/MyAudioContext';
import PlayerControls from './MediaPlayer/PlayerControls';

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
      <div className="flex h-32 w-32 items-center justify-evenly rounded-full">
        <label htmlFor={id} aria-label={label}>
          <RxUpload className="h-4 w-4 cursor-pointer text-zinc-400 transition duration-300 ease-in-out hover:text-zinc-900" />
          <input
            className="hidden"
            id={id}
            type="file"
            accept="audio/*"
            onChange={handleSampleChange}
          />
        </label>
        <PlayerControls
          id={id}
          setAudioBuffers={setAudioBuffers}
          audioBuffers={audioBuffers}
        />
      </div>
    </section>
  );
};

export default FileInput;
