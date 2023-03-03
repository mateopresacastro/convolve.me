import { useCallback, useContext } from 'react';
import { RxUpload } from 'react-icons/rx';
import { BsFillTrashFill } from 'react-icons/bs';
import { getAudioBufferFromFile } from '../lib/audioUtils';
import { MyAudioContext } from '../contexts/MyAudioContext';
import PlayerControls from './PlayerControls/PlayerControls';
import TrashButton from './PlayerControls/TrashButton';

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

  const deleteAudioBuffer = () => {
    if (audioBuffers[id]) {
      setAudioBuffers((audioBuffers) => ({
        ...audioBuffers,
        [id]: null,
      }));
    }
  };

  return (
    <section className="mx-14 flex h-20 w-52 items-center justify-evenly">
      <label htmlFor={id} aria-label={label}>
        <RxUpload className="h-4 w-4 cursor-pointer rounded-full text-zinc-400 transition duration-300 ease-in-out hover:text-sky-600 " />
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
      <TrashButton
        id={id}
        deleteAudioBuffer={deleteAudioBuffer}
        audioBuffers={audioBuffers}
      />
    </section>
  );
};

export default FileInput;
