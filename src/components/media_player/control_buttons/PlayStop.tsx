import { useContext, useRef, useState } from 'react';
import { BsFillPlayFill, BsFillStopFill } from 'react-icons/bs';
import { AudioBuffersState } from '../../../App';
import { MyAudioContext } from '../../../contexts/MyAudioContext';

interface PlayStopProps {
    audioBuffers: AudioBuffersState;
    id: 'firstSample' | 'secondSample';
}

export default function PlayStop({ audioBuffers, id }: PlayStopProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const ctx = useContext(MyAudioContext);
    const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

    const playSample = () => {
        if (audioBuffers[id] && !isPlaying) {
            setIsPlaying(true);
            const sampleSourceNode = new AudioBufferSourceNode(ctx, {
                buffer: audioBuffers[id],
            });
            sourceNodeRef.current = sampleSourceNode;
            sampleSourceNode.connect(ctx.destination);
            sampleSourceNode.start();
            sampleSourceNode.onended = () => setIsPlaying(false);
        }
    };

    const stopSample = () => {
        if (sourceNodeRef.current && isPlaying) {
            sourceNodeRef.current.stop();
        }
    };

    return (
        <>
            <BsFillPlayFill
                className={`${
                    isPlaying
                        ? ` text-green-500`
                        : ` text-zinc-900 hover:text-zinc-500`
                } h-5 w-5 cursor-pointer`}
                onClick={playSample}
            />
            <BsFillStopFill
                className="h-5 w-5 cursor-pointer  text-zinc-900 hover:text-zinc-500"
                onClick={stopSample}
            />
        </>
    );
}
