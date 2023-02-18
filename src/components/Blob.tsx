import { useEffect, useRef } from 'react';

const Blob = () => {
  useEffect(() => {
    window.onpointermove = (event) => handlePointerMove(event);
  }, []);

  const myRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: globalThis.PointerEvent) => {
    if (myRef.current) {
      const { clientX, clientY } = event;
      myRef.current.animate(
        {
          // -120 to center mouse cursor in the middle of the blob, which is 240px (h-60 in tailwind)
          left: `${clientX - 120}px`,
          top: `${clientY - 120}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    }
  };

  return (
    <div
      className="absolute z-0 aspect-square h-60 animate-rotate rounded-full bg-gradient-to-r from-blue-500 to-red-500 blur-4xl filter"
      ref={myRef}
    ></div>
  );
};

export default Blob;
