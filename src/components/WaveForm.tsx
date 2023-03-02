import { useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js';
import { AudioBuffersState } from '../App';
import { audioBufferToWave } from '../lib/audioUtils';

const WaveForm = ({
  audioBuffers,
  id,
}: {
  audioBuffers: AudioBuffersState;
  id: 'firstSample' | 'secondSample';
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let wavesurfer: wavesurfer;
    (async () => {
      if (waveformRef.current && audioBuffers[id]) {
        const OPTIONS = {
          container: waveformRef.current as unknown as HTMLDivElement,
          barHeight: 5,
          barWidth: 1,
          height: 30,
          normalize: true,
          waveColor: '#a1a1aa',
          progressColor: '#3f3f46',
          cursorColor: '#f4f4f5',
        };
        wavesurfer = WaveSurfer.create(OPTIONS);
        const waveFile = await audioBufferToWave(audioBuffers[id]!);
        wavesurfer.loadBlob(waveFile);
      }
    })();

    return () => wavesurfer && wavesurfer.destroy();
  }, [audioBuffers[id]]);

  return audioBuffers[id] ? (
    <div ref={waveformRef} className="max-w-10 mx-7 mb-10 h-3"></div>
  ) : (
    <div className="mb-10 h-3"></div>
  );
};

export default WaveForm;
