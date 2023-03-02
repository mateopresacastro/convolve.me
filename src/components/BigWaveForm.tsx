import { useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js';

const BigWaveForm = ({
  convolvedSampleWaveFile,
}: {
  convolvedSampleWaveFile: Blob | null;
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let wavesurfer: wavesurfer;
    (async () => {
      if (waveformRef.current && convolvedSampleWaveFile) {
        const OPTIONS = {
          container: waveformRef.current as unknown as HTMLDivElement,
          barHeight: 20,
          barWidth: 1,
          height: 50,
          normalize: true,
          waveColor: '#a1a1aa',
          progressColor: '#3f3f46',
          cursorColor: '#f4f4f5',
        };
        wavesurfer = WaveSurfer.create(OPTIONS);
        wavesurfer.loadBlob(convolvedSampleWaveFile);
      }
    })();

    return () => wavesurfer && wavesurfer.destroy();
  }, [convolvedSampleWaveFile]);

  return <div ref={waveformRef} className="max-w-96 my-10 h-5 w-96"></div>;
};

export default BigWaveForm;
