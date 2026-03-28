import React, { useState, useEffect } from "react";

export function TypingAnimation({
  words,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDelay = 1000,
  loop = true,
  className = ""
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;
    if (!words || words.length === 0) return;

    const currentWord = words[currentWordIndex];

    const type = () => {
      if (!isDeleting) {
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
          timeout = setTimeout(type, typeSpeed);
        } else {
          timeout = setTimeout(() => setIsDeleting(true), pauseDelay);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
          timeout = setTimeout(type, deleteSpeed);
        } else {
          setIsDeleting(false);
          if (currentWordIndex === words.length - 1 && !loop) {
            return;
          }
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
          timeout = setTimeout(type, typeSpeed);
        }
      }
    };

    timeout = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, pauseDelay, loop]);

  return <span className={`typing-animation ${className}`}>{currentText}<span className="cursor-blink">|</span></span>;
}
