import download from '../lib/download';
import WaveForm from './WaveForm';
import { BsDownload, BsArrowLeft } from 'react-icons/bs';
import PlayStop from './media_player/control_buttons/PlayStop.js';
import { getAudioBufferFromFile } from 'lib/audio_utils';

export default function ResultModal({
    onClose,
    sample,
    buffer,
}: {
    onClose: () => void;
    sample: Blob | null;
    buffer: AudioBuffer | null;
}) {
    return (
        <>
            <div className="absolute top-0 h-full w-full bg-zinc-900 opacity-50"></div>
            <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center">
                <div className="xl:w-1/16 absolute flex h-72 w-96 flex-col items-center justify-evenly rounded-lg bg-zinc-50 shadow-2xl md:w-1/2 lg:w-1/2">
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="mb-2 text-xl font-bold text-zinc-500">
                            Result
                        </h3>
                        <div className="flex">
                            <PlayStop
                                audioBuffers={{
                                    firstSample: buffer,
                                    secondSample: null,
                                }}
                                id="firstSample"
                            />
                        </div>
                    </div>
                    <div className="z-40 text-zinc-500">
                        <WaveForm sample={sample} />
                    </div>
                    <div className="flex w-96 justify-evenly">
                        <button
                            onClick={onClose}
                            className="flex w-36 cursor-pointer items-center justify-evenly rounded-md px-3.5 py-1.5 text-sm text-zinc-700 underline-offset-4 hover:underline"
                        >
                            <BsArrowLeft />
                            Go Back
                        </button>
                        <button
                            onClick={() => sample && download(sample)}
                            className="flex w-36 cursor-pointer items-center justify-evenly rounded-md bg-sky-100 px-3.5 py-1.5 text-sm text-sky-800 shadow-sm transition  duration-300 ease-in-out hover:bg-sky-200"
                        >
                            <BsDownload />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
