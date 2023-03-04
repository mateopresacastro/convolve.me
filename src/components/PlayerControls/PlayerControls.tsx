import { Dispatch, SetStateAction } from 'react';
import { AudioBuffersState } from '../../App';
import Record from './Record';
import PlayStop from './PlayStop';

interface PlayerControlProps {
  setAudioBuffers: Dispatch<SetStateAction<AudioBuffersState>>;
  audioBuffers: AudioBuffersState;
  id: 'firstSample' | 'secondSample';
}

export default function PlayerControls({
  id,
  setAudioBuffers,
  audioBuffers,
}: PlayerControlProps) {
  return (
    <div className="mx-3 flex">
      <PlayStop id={id} audioBuffers={audioBuffers} />
      <Record id={id} setAudioBuffers={setAudioBuffers} />
    </div>
  );
}
