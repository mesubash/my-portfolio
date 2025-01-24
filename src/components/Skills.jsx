import React, { useState, useEffect, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "aos/dist/aos.css";
import AOS from "aos";

const skills = [
  { name: "Spring Boot", level: 73 },
  { name: "Java", level: 75 },
  { name: "React", level: 65 },
  { name: "JavaScript", level: 60 },
  { name: "HTML & CSS", level: 70 },
  { name: "C/C++", level: 59 },
  { name: "Node.js", level: 40 },
  { name: "Postgres", level: 55 },
  { name: "PHP", level: 54 },
  { name: "Android Development", level: 50 }
];

const Skills = () => {
  const [animatedLevels, setAnimatedLevels] = useState(skills.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimatedLevels(prev => 
          prev.map((level, idx) => 
            level < skills[idx].level ? level + 1 : level
          )
        );
      }, 20);

      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const handleHover = (index) => {
    setHoveredIndex(index);
    if (hoveredIndex === index) {
      let currentLevel = 0;
      const interval = setInterval(() => {
        if (currentLevel >= skills[index].level) {
          clearInterval(interval);
          return;
        }
        currentLevel++;
        setAnimatedLevels(prev => 
          prev.map((level, idx) => 
            idx === index ? currentLevel : level
          )
        );
      }, 20);
    }
  };

  return (
    <div ref={sectionRef} className="relative bg-gray-700 shadow-lg rounded-lg p-6 mx-auto max-w-6xl z-10 shadow-base-200">
      <h3 className="text-2xl font-bold text-center text-white" data-aos="fade-down">Skills</h3>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center transform transition-all duration-300 hover:scale-125"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="w-24 h-24 mb-2">
              <CircularProgressbar
                value={animatedLevels[index]}
                text={`${animatedLevels[index]}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#a855f7",
                  trailColor: "#d1d5db",
                  pathTransition: "ease-in-out",
                  rotation: hoveredIndex === index ? 0.25 : 0,
                })}
              />
            </div>
            <span className="text-lg font-medium text-white">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;