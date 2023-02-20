// https://stackoverflow.com/questions/62172398/convert-audiobuffer-to-arraybuffer-blob-for-wav-download

const download = (audioBuffer: AudioBuffer): Promise<boolean | ErrorEvent> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./src/lib/recorderWorker.js');
    // initialize the new worker
    worker.postMessage({
      command: 'init',
      config: { sampleRate: 44100 },
    });

    // send the channel data from our buffer to the worker
    worker.postMessage({
      command: 'record',
      buffer: [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)],
    });

    worker.postMessage({
      command: 'exportWAV',
      type: 'audio/wav',
    });

    // callback for `exportWAV`
    worker.onmessage = (e) => {
      const blob = e.data;
      const newFileURL = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = newFileURL;
      link.download = new Date().toISOString() + '.wav';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(newFileURL);
      resolve(true);
    };

    worker.onerror = (error) => {
      reject(error);
    };
  });
};

export default download;
