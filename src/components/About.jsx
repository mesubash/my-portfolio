import React, { useEffect } from "react";
import Skills from "./Skills"; // Import the Skills component

const About = () => {
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

    let currentStringIndex = 0;
    let currentCharIndex = 0;
    const typingSpeed = 50;
    const newLineDelay = 1000;
    const cursorChar = "|";

    const typedContainer = document.querySelector(".typed-about");

    const type = () => {
      if (currentStringIndex < strings.length) {
        const currentString = strings[currentStringIndex];
        if (currentCharIndex < currentString.length) {
          const currentLine = document.querySelector(`#line-${currentStringIndex}`);
          currentLine.innerHTML = currentLine.innerHTML.slice(0, -1) + currentString[currentCharIndex] + cursorChar;
          currentCharIndex++;
          setTimeout(type, typingSpeed);
        } else {
          const currentLine = document.querySelector(`#line-${currentStringIndex}`);
          currentLine.innerHTML = currentLine.innerHTML.slice(0, -1); // Remove cursor from finished line
          currentStringIndex++;
          currentCharIndex = 0;
          if (currentStringIndex < strings.length) {
            typedContainer.innerHTML += `<div id="line-${currentStringIndex}" class="flex justify-start"><span class='text-purple-500'>➤</span> ${cursorChar}</div>`;
            setTimeout(type, newLineDelay);
          } else {
            const lastLine = document.querySelector(`#line-${currentStringIndex - 1}`);
            lastLine.innerHTML += `<span class="typed-cursor-about">${cursorChar}</span>`; // Add cursor to the last line
          }
        }
      }
    };

    typedContainer.innerHTML = `<div id="line-0" class="flex justify-start"><span class='text-purple-500'>➤</span> ${cursorChar}</div>`;
    type();
  }, []);

  return (
    <section id="about" className="py-12 px-4 h-screen bg-gray-800 text-white relative">
      <h2 className="text-4xl font-bold text-center mb-8">About Me</h2>
      
      <div className="w-2/3 mx-auto bg-gray-800 shadow-lg rounded-lg p-8 flex flex-col justify-start items-start h-3/4">
        <div className="text-2xl text-left typed-about font-mono"></div>
      </div>
      <div className="relative z-10 -mt-16">
        <Skills /> {/* Include the Skills component */}
      </div>
      <style>
        {`
          .typed-cursor-about {
            color: #ffffff; /* Change cursor color to match text-purple-500 */
            display: inline-block; /* Ensure cursor is displayed as an inline element */
            vertical-align: middle; /* Align cursor vertically in the middle */
            animation: blink 1s step-end infinite; /* Blinking effect */
          }

          @keyframes blink {
            from, to {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </section>
  );
};

export default About;