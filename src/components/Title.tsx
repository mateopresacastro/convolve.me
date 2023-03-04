export default function Title() {
  return (
    <div className="absolute top-40">
      <section className=" mb-20 flex flex-col items-center justify-center">
        <h1 className="mb-3 text-5xl font-extrabold text-zinc-700">
          convolve<span className="font-light">.me</span>
        </h1>
        <p className="text-sm text-zinc-500">
          Upload or record two samples and press start
        </p>
      </section>
    </div>
  );
}
