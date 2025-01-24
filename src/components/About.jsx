import React, { useEffect, useRef } from "react";
import Skills from "./Skills";

const About = () => {
  const typedRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const strings = [
      "I'm a passionate web developer with experience in building modern web applications.",
      "I have worked with various tech stacks including Spring Boot, Android Studio, and React.",
      "Currently pursuing a degree in Software Engineering.",
      "Experienced in developing backend services using Spring Boot.",
      "Familiar with mobile app development using Android Studio.",
      "Passionate about learning new technologies and improving my skills.",
      "Enjoy working on both front-end and back-end development.",
      "Strong problem-solving skills and attention to detail."
    ];
    
    let typing = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typing) {
          typing = true;
          startTyping();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const startTyping = () => {
      if (!typedRef.current) {
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        const typingSpeed = 50;
        const newLineDelay = 1000;
        const cursorChar = "|";

        const typedContainer = document.querySelector(".typed-about");
        typedContainer.innerHTML = `<div id="line-0" class="flex justify-start leading-normal"><span class='text-purple-500'>➤</span> ${cursorChar}</div>`;

        const type = () => {
          if (!typedRef.current) return;

          if (currentStringIndex < strings.length) {
            const currentString = strings[currentStringIndex];
            if (currentCharIndex < currentString.length) {
              const currentLine = document.querySelector(`#line-${currentStringIndex}`);
              if (currentLine) {
                currentLine.innerHTML = `<span class='text-purple-500'>➤</span> ${currentString.substring(0, currentCharIndex + 1)}${cursorChar}`;
                currentCharIndex++;
                setTimeout(type, typingSpeed);
              }
            } else {
              const currentLine = document.querySelector(`#line-${currentStringIndex}`);
              currentLine.innerHTML = `<span class='text-purple-500'>➤</span> ${strings[currentStringIndex]}`;
              
              currentStringIndex++;
              currentCharIndex = 0;
              if (currentStringIndex < strings.length) {
                const newLine = document.createElement('div');
                newLine.id = `line-${currentStringIndex}`;
                newLine.className = 'flex justify-start leading-normal';
                newLine.innerHTML = `<span class='text-purple-500'>➤</span> ${cursorChar}`;
                typedContainer.appendChild(newLine);
                setTimeout(type, newLineDelay);
              } else {
                const lastLine = document.querySelector(`#line-${currentStringIndex - 1}`);
                lastLine.innerHTML = `<span class='text-purple-500'>➤</span> ${strings[currentStringIndex - 1]}<span class="typed-cursor-about">${cursorChar}</span>`;
              }
            }
          }
        };

        typedRef.current = true;
        type();
      }
    };

    return () => {
      observer.disconnect();
      typedRef.current = null;
    };
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 px-4 bg-gray-800 text-white relative">
      <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>
      
      <div className="w-2/3 mx-auto bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col justify-start items-start mb-24">
        <div className="text-2xl text-left typed-about font-mono space-y-1"></div>
      </div>
      <div className="relative z-10 -mt-16 mb-16">
        <Skills />
      </div>
      <style>
        {`
          .typed-cursor-about {
            color: #ffffff;
            display: inline-block;
            vertical-align: middle;
            animation: blink 1s step-end infinite;
          }

          @keyframes blink {
            from, to { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default About;