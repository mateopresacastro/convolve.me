import { useRef } from 'react';

export default function Blob() {
  const myRef = useRef<HTMLDivElement>(null);

  window.onpointermove = (event) => handlePointerMove(event);

  const handlePointerMove = (event: globalThis.PointerEvent) => {
    if (myRef.current) {
      const { clientX, clientY } = event;
      myRef.current.animate(
        {
          // -48 to center mouse cursor in the middle of the blob, which is 96px (h-24 in tailwind)
          left: `${clientX - 48}px`,
          top: `${clientY - 48}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    }
  };

  return (
    <div
      className="absolute z-0 aspect-square h-24 animate-rotate rounded-full bg-gradient-to-r from-zinc-100 to-blue-300 blur-2xl filter"
      ref={myRef}
    ></div>
  );
}
