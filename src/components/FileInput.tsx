import { ChangeEvent, useContext } from 'react';
import { getAudioBufferFromFile } from '../lib/audioUtils';
import { MyAudioContext } from '../contexts/MyAudioContext';
import { FileInputProps } from '../types/types';

const FileInput = ({ setAudioBuffers, label, id }: FileInputProps) => {
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

  return (
    <section className="z-20">
      <label
        className="mb-2 block text-sm font-medium text-gray-500"
        htmlFor="file_input"
        aria-label={label}
      >
        {label}
        <input
          className="mb-5 block w-96 cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
          id={id}
          type="file"
          accept="audio/*"
          onChange={handleSampleChange}
        />
      </label>
    </section>
  );
};

export default FileInput;
