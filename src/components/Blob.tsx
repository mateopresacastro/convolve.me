import { useRef } from 'react';

const Blob = () => {
  const myRef = useRef<HTMLDivElement>(null);

  window.onpointermove = (event) => handlePointerMove(event);

  const handlePointerMove = (event: globalThis.PointerEvent) => {
    if (myRef.current) {
      const { clientX, clientY } = event;
      myRef.current.animate(
        {
          // -112 to center mouse cursor in the middle of the blob, which is 224px (h-56 in tailwind)
          left: `${clientX - 112}px`,
          top: `${clientY - 112}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    }
  };

  return (
    <div
      className="absolute z-0 aspect-square h-56 animate-rotate rounded-full bg-gradient-to-r from-zinc-100 to-blue-200 blur-4xl filter"
      ref={myRef}
    ></div>
  );
};

export default Blob;
