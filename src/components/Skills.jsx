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
  { name: "Python", level: 49}, 
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

  return (
    <div ref={sectionRef} className="relative bg-gray-800 shadow-lg rounded-lg p-8 mx-auto max-w-6xl z-10 overflow-hidden">
      {/* Floating bubbles background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-10 h-10 bg-purple-500 opacity-20 rounded-full blur-2xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <h3 className="text-3xl font-bold text-center text-white mb-6" data-aos="fade-down">Skills</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="flex flex-col items-center transform transition-all duration-500 hover:scale-110 hover:rotate-6 relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-aos="fade-up"
            data-aos-delay={index * 100}
          >
            <div className="w-24 h-24 mb-2 relative">
              <CircularProgressbar
                value={animatedLevels[index]}
                text={`${animatedLevels[index]}%`}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: hoveredIndex === index ? "#f59e0b" : "#a855f7",
                  trailColor: "#374151",
                  pathTransition: "ease-in-out",
                  rotation: hoveredIndex === index ? 0.25 : 0,
                })}
              />
              {hoveredIndex === index && (
                <div className="absolute inset-0 animate-ping bg-purple-500 rounded-full opacity-20"></div>
              )}
            </div>
            <span className="text-lg font-medium text-white">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
