import { FileInputProps } from '../types/types';

const FileInput = ({ handleSampleChange, label, id }: FileInputProps) => {
  return (
    <section className="z-20">
      <label
        className="mb-2 block text-sm font-medium text-gray-500"
        htmlFor="file_input"
      >
        {label}
      </label>
      <input
        className="mb-5 block w-96 cursor-pointer rounded border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
        id={id}
        type="file"
        accept="audio/*"
        onChange={handleSampleChange}
      />
    </section>
  );
};

export default FileInput;
