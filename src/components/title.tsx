export default function Title() {
  return (
    <div className="flex w-full flex-col items-start text-sm text-neutral-950 md:mb-0">
      <h1 className="text-4xl font-semibold tracking-tighter">Convolution</h1>

      <p className="w-80 pt-1 leading-7 text-neutral-500 md:w-[664px]">
        The process of multiplying two audio signals. The frequencies that are
        shared between the two will be accentuated, while the rest will be
        attenuated.
      </p>

      <p className="w-80 py-2 text-neutral-500 md:w-[664px]">
        Record or upload two audio files and press convolve:
      </p>
    </div>
  );
}
