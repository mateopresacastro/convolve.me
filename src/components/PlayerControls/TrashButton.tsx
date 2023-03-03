import { BsFillTrashFill } from 'react-icons/bs';
import type { AudioBuffersState } from '../../App';

const TrashButton = ({
  deleteAudioBuffer,
  id,
  audioBuffers,
}: {
  deleteAudioBuffer: () => void;
  id: 'firstSample' | 'secondSample';
  audioBuffers: AudioBuffersState;
}) => {
  return (
    <BsFillTrashFill
      className={`${
        audioBuffers[id] ? ` hover:text-red-600` : `hover:text-zinc-700`
      } h-4 w-4 cursor-pointer text-zinc-400 transition duration-300 ease-in-out`}
      onClick={deleteAudioBuffer}
    />
  );
};

export default TrashButton;
