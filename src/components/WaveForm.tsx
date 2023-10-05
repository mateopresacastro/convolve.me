import { useRef, useEffect } from 'react';
import wavesurfer from 'wavesurfer.js';
import WaveSurfer from 'wavesurfer.js';
import { AudioBuffersState } from '../App';
import { audioBufferToWave } from '../lib/audio_utils';

interface WaveFormProps {
    sample: AudioBuffer | Blob | null;
}

export default function WaveForm({ sample }: WaveFormProps) {
    const waveformRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let wavesurfer: wavesurfer;
        (async () => {
            if (waveformRef.current && sample) {
                const OPTIONS = {
                    container: waveformRef.current as unknown as HTMLDivElement,
                    barHeight: 5,
                    barWidth: 1,
                    height: 30,
                    normalize: true,
                    waveColor: '#a1a1aa',
                    progressColor: '#3f3f46',
                    cursorColor: '#f4f4f5',
                    hideScrollbar: true,
                };
                wavesurfer = WaveSurfer.create(OPTIONS);

                const waveFile =
                    sample instanceof AudioBuffer
                        ? await audioBufferToWave(sample)
                        : sample;

                wavesurfer.loadBlob(waveFile);
            }
        })();

        return () => wavesurfer && wavesurfer.destroy();
    }, [sample]);

    return sample ? (
        <div className="flex h-20 w-64 flex-col items-center justify-evenly overflow-hidden rounded-lg bg-zinc-100 shadow-sm">
            <div
                ref={waveformRef}
                className="w-full overflow-hidden px-9"
            ></div>
        </div>
    ) : (
        <div className="flex h-20 w-64 flex-col items-center justify-center rounded-lg bg-zinc-100 shadow-inner">
            <p className="text-xs italic text-zinc-400">
                No audio loaded yet...
            </p>
        </div>
    );
}
