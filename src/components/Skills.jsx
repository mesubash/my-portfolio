import React from "react";

const skills = {
  "Backend Development": [
    "Spring Boot",
    "Java",
    "RESTful API Design",
    "JWT & OAuth2 Security",
    "PostgreSQL",
    "Redis",
    "Microservices Architecture",
    "Docker & Docker Compose"
  ],
  "Frontend Development": [
    "React.js",
    "Tailwind CSS",
    "HTML5 & CSS3",
    "JavaScript (ES6+)",
    "Responsive Web Design"
  ],
  "Mobile Development": [
    "Flutter (Dart)",
    "Android Studio (Java)",
    "State Management (Provider, Riverpod)"
  ],
  "DevOps & Tools": [
    "Git & GitHub",
    "GitHub Actions (CI/CD)",
    "Nginx",
    "Vault (Secrets Management)",
    "Postman / Swagger",
    "Linux (Ubuntu)"
  ],
  "Other Languages & Tools": [
    "Python",
    "C/C++",
    "PHP (Basic)",
    "Kotlin DSL (Gradle)",
    "MQTT / WebSockets"
  ],
  "Soft Skills": [
    "System Design Thinking",
    "Team Collaboration (Agile)",
    "Technical Documentation",
    "Problem Solving",
    "Presentation & Demo"
  ]
};

const Skills = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Technical Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold mb-3 text-indigo-700">{category}</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {items.map(skill => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
