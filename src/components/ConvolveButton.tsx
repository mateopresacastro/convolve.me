const ConvolveButton = ({ handleConvolve }: { handleConvolve: () => void }) => {
  return (
    <button
      onClick={handleConvolve}
      type="submit"
      className="z-20 rounded-md bg-gray-600 px-3.5 py-1.5 text-base font-semibold text-white shadow-sm transition duration-500 ease-in-out hover:bg-zinc-300"
    >
      Convolve
    </button>
  );
};

export default ConvolveButton;
