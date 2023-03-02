import { Dispatch, SetStateAction } from 'react';
import { AudioBuffersState } from '../../App';
import Record from './Record';
import PlayStop from './PlayStop';

interface IPlayerControlProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  audioBuffers: AudioBuffersState;
  id: 'firstSample' | 'secondSample';
}

const PlayerControls = ({
  id,
  setAudioBuffers,
  audioBuffers,
}: IPlayerControlProps) => {
  return (
    <div className="flex">
      <PlayStop id={id} audioBuffers={audioBuffers} />
      <Record id={id} setAudioBuffers={setAudioBuffers} />
    </div>
  );
};

export default PlayerControls;
