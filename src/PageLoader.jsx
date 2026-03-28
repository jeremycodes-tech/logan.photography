import { useEffect, useState } from 'react';
import './PageLoader.css';

const greetings = [
  { text: 'Hello', lang: 'English' },
  { text: 'Bonjour', lang: 'French' },
  { text: 'Hola', lang: 'Spanish' },
  { text: 'مرحبا', lang: 'Arabic' },
  { text: 'Ciao', lang: 'Italian' },
  { text: '你好', lang: 'Chinese' },
  { text: 'こんにちは', lang: 'Japanese' },
  { text: 'Hallå', lang: 'Swedish' },
  { text: 'Olá', lang: 'Portuguese' },
  { text: 'Jambo', lang: 'Swahili' },
  { text: 'Hallo', lang: 'German' },
  { text: 'Привет', lang: 'Russian' },
  { text: 'سلام', lang: 'Persian' },
  { text: '안녕하세요', lang: 'Korean' },
  { text: 'Merhaba', lang: 'Turkish' },
  { text: 'Namaste', lang: 'Hindi' },
  { text: 'Sawadee', lang: 'Thai' },
  { text: 'Shalom', lang: 'Hebrew' },
  { text: 'Salut', lang: 'Romanian' },
  { text: 'Ahoj', lang: 'Czech' },
];

export default function PageLoader({ onDone }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const perWord = 290; // ms each greeting shows

    const interval = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1;
        if (next >= greetings.length) {
          clearInterval(interval);
          // Start fading the whole loader
          setTimeout(() => {
            onDone && onDone(); // Initialize GSAP instantly before fading
            setFadeOut(true);
            setTimeout(() => {
              setVisible(false);
            }, 700);
          }, 200);
          return prev;
        }
        return next;
      });
    }, perWord);

    return () => clearInterval(interval);
  }, [onDone]);

  if (!visible) return null;

  return (
    <div className={`page-loader${fadeOut ? ' page-loader--out' : ''}`}>
      <div className="loader">
        <span><span></span><span></span><span></span><span></span></span>
        <div className="base">
          <span></span>
          <div className="face"></div>
        </div>
      </div>
      <div className="longfazers">
        <span></span><span></span><span></span><span></span>
      </div>
      <div className="loader-center">
        <p key={index} className="loader-greeting">
          {greetings[index].text}
        </p>
        <span className="loader-lang">{greetings[index].lang}</span>
      </div>
    </div>
  );
}
