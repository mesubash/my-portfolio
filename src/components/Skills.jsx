import React from "react";

const skillCategories = {
  "Core Stack": {
    items: ["Java Spring Boot", "Flutter", "React", "PostgreSQL"],
    color: "purple",
    icon: "⚡"
  },
  "Production Ready": {
    items: ["Docker", "AWS", "CI/CD", "Nginx"],
    color: "green", 
    icon: "🚀"
  },
  "Data & AI": {
    items: ["Python", "Scikit-learn", "ML Models"],
    color: "blue",
    icon: "🤖"
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Built With
          </h2>
          <p className="text-gray-400 text-lg">Technologies I use to ship products</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(skillCategories).map(([category, {items, color, icon}]) => (
            <div key={category} className={`bg-gradient-to-br from-${color}-800/20 to-${color}-900/20 p-6 rounded-xl border border-${color}-500/30 hover:border-${color}-400/50 transition-all duration-300 hover:scale-105`}>
              <div className="text-center mb-4">
                <div className="text-3xl mb-2">{icon}</div>
                <h3 className={`text-lg font-semibold text-${color}-400`}>{category}</h3>
              </div>
              <div className="space-y-2">
                {items.map(skill => (
                  <div key={skill} className={`px-3 py-1 bg-${color}-600/10 text-${color}-300 rounded-full text-sm text-center border border-${color}-500/20`}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl border border-gray-600">
            <p className="text-gray-300 text-lg mb-2">
              "The best way to learn is to build real products"
            </p>
            <p className="text-gray-500 text-sm">- Every successful developer</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
