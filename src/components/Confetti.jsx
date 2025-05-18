import canvasConfetti from "canvas-confetti";
import React, { useEffect, useRef } from "react";

export default function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const confetti = canvasConfetti.create(canvasRef.current, {
      resize: true,
      useWorker: true,
    });

    confetti({
      particleCount: 20,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });

    confetti({
      particleCount: 20,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
}
