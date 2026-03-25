import { useState, useRef, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const TextScramble = ({ text, className = "" }) => {
  const [display, setDisplay] = useState(text);
  const isAnimatingRef = useRef(false);
  const frameRef = useRef(null);
  const enterTimerRef = useRef(null);

  const scramble = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const original = text;
    const length = original.length;
    let frame = 0;
    const totalFrames = length * 2.5;

    const update = () => {
      let result = "";
      for (let i = 0; i < length; i++) {
        if (original[i] === " ") { result += " "; continue; }
        const revealAt = (i / length) * totalFrames * 0.7;
        if (frame > revealAt) {
          result += original[i];
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setDisplay(result);
      frame++;
      if (frame < totalFrames) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        setDisplay(original);
        isAnimatingRef.current = false;
      }
    };

    frameRef.current = requestAnimationFrame(update);
  }, [text]);

  const handleEnter = useCallback(() => {
    // Debounce: only scramble if mouse stays for 150ms (prevents scroll-triggered flicker)
    clearTimeout(enterTimerRef.current);
    enterTimerRef.current = setTimeout(scramble, 150);
  }, [scramble]);

  const handleLeave = useCallback(() => {
    clearTimeout(enterTimerRef.current);
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    isAnimatingRef.current = false;
    setDisplay(text);
  }, [text]);

  return (
    <span
      className={className}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ cursor: "default" }}
    >
      {display}
    </span>
  );
};

export default TextScramble;
