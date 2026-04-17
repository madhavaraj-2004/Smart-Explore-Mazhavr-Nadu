import { useEffect, useState } from 'react';

function isFinePointerDevice() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia('(pointer: fine)').matches;
}

const initialPosition = { x: 0, y: 0 };

const CustomCursor = () => {
  const [position, setPosition] = useState(initialPosition);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isFinePointerDevice());
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor="hover"]';

    const handlePointerMove = (event) => {
      const target = event.target;
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      setHovering(Boolean(target?.closest?.(interactiveSelector)));
    };

    const handlePointerLeave = () => {
      setVisible(false);
      setHovering(false);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('blur', handlePointerLeave);

    return () => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('blur', handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <span
        className={`premium-cursor premium-cursor--ring ${visible ? 'is-visible' : ''} ${hovering ? 'is-hovering' : ''}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden="true"
      />
      <span
        className={`premium-cursor premium-cursor--dot ${visible ? 'is-visible' : ''} ${hovering ? 'is-hovering' : ''}`}
        style={{ left: position.x, top: position.y }}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
