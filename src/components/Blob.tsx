import { useRef } from 'react';

const Blob = () => {
  const myRef = useRef<HTMLDivElement>(null);

  window.onpointermove = (event) => handlePointerMove(event);

  const handlePointerMove = (event: globalThis.PointerEvent) => {
    if (myRef.current) {
      const { clientX, clientY } = event;
      myRef.current.animate(
        {
          // -144 to center mouse cursor in the middle of the blob, which is 288px (h-72 in tailwind)
          left: `${clientX - 144}px`,
          top: `${clientY - 144}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );
    }
  };

  return (
    <div
      className="absolute z-0 aspect-square h-72 animate-rotate rounded-full bg-gradient-to-r from-blue-500 to-red-500 blur-4xl filter"
      ref={myRef}
    ></div>
  );
};

export default Blob;
