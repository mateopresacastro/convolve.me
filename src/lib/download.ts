export default function download(blob: Blob) {
  const newFileURL = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = newFileURL;
  link.download = "convolve-" + new Date().toISOString() + ".wav";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(newFileURL);
}
