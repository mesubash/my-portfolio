// Node positions for the 3D graph (x, y, z coordinates)
// Skills are grouped but positioned to show connections
const techStack = [
  // Backend cluster (left)
  { label: "Spring Boot", group: "backend", x: -3.5, y: 1.2, z: 0 },
  { label: "Node.js", group: "backend", x: -4, y: -0.5, z: 0.5 },
  { label: "Express", group: "backend", x: -4.5, y: -1.3, z: 0.2 },
  { label: "PostgreSQL", group: "backend", x: -2.8, y: -1.2, z: -0.3 },
  { label: "MySQL", group: "backend", x: -2.2, y: -0.3, z: -0.8 },
  { label: "MongoDB", group: "backend", x: -3.2, y: -2, z: 0.1 },
  { label: "Redis", group: "backend", x: -4.2, y: 0.3, z: -0.6 },
  { label: "Docker", group: "devops", x: -3, y: 2.2, z: 0.3 },

  // Frontend cluster (right)
  { label: "React", group: "frontend", x: 3.5, y: 0.8, z: 0.2 },
  { label: "Next.js", group: "frontend", x: 4, y: -0.3, z: -0.4 },
  { label: "Tailwind", group: "frontend", x: 3, y: -1.3, z: 0.5 },

  // Mobile cluster (top)
  { label: "Flutter", group: "mobile", x: 0, y: 2.5, z: 0.5 },
  { label: "Android", group: "mobile", x: 1.2, y: 2, z: -0.3 },

  // ML cluster (bottom)
  { label: "Python", group: "ml", x: 0.5, y: -2, z: 0.2 },
  { label: "Scikit", group: "ml", x: -0.8, y: -2.3, z: -0.3 },
  { label: "TensorFlow", group: "ml", x: 1.5, y: -2.4, z: 0 },
  { label: "Pandas", group: "ml", x: -0.2, y: -2.8, z: 0.4 },
  { label: "NumPy", group: "ml", x: 0.8, y: -2.9, z: -0.2 },
  { label: "Streamlit", group: "ml", x: -1.5, y: -1.8, z: 0.3 },

  // DevOps cluster (far)
  { label: "AWS", group: "devops", x: -1.5, y: 1.5, z: -1.2 },
  { label: "CI/CD", group: "devops", x: 1.5, y: 1.8, z: -0.8 },
  { label: "Nginx", group: "devops", x: 2.5, y: 2.2, z: -0.5 },
  { label: "Git", group: "devops", x: 0, y: 0, z: -1 },
  { label: "RabbitMQ", group: "devops", x: 0.5, y: 2.6, z: -0.3 },
  { label: "VPS", group: "devops", x: -0.5, y: 2.3, z: -0.6 },
  { label: "Linux", group: "devops", x: 1, y: 1.2, z: -1.1 },
];

// Edges connecting related technologies
export const connections = [
  // Backend internal
  ["Spring Boot", "PostgreSQL"],
  ["Spring Boot", "Redis"],
  ["Spring Boot", "Docker"],
  ["Node.js", "Express"],
  ["Node.js", "PostgreSQL"],
  ["Node.js", "MongoDB"],
  ["Express", "MongoDB"],
  ["Spring Boot", "MySQL"],
  ["MySQL", "PostgreSQL"],

  // Frontend internal
  ["React", "Next.js"],
  ["React", "Tailwind"],

  // Cross-stack
  ["Spring Boot", "React"],
  ["Spring Boot", "Flutter"],
  ["Spring Boot", "Next.js"],
  ["Next.js", "Tailwind"],
  ["Flutter", "Android"],
  ["Python", "Scikit"],
  ["Python", "TensorFlow"],
  ["Python", "Pandas"],
  ["Python", "NumPy"],
  ["Python", "Streamlit"],
  ["Pandas", "NumPy"],
  ["Scikit", "Pandas"],
  ["TensorFlow", "NumPy"],
  ["Docker", "AWS"],
  ["Docker", "CI/CD"],
  ["CI/CD", "Git"],
  ["Nginx", "AWS"],
  ["RabbitMQ", "Spring Boot"],
  ["RabbitMQ", "Docker"],
  ["VPS", "Nginx"],
  ["VPS", "Docker"],
  ["VPS", "Linux"],
  ["Linux", "Nginx"],
  ["Linux", "Docker"],
  ["Node.js", "React"],
  ["PostgreSQL", "Redis"],
];

export const groupColors = {
  backend: "#6366f1",  // indigo
  frontend: "#22d3ee", // cyan
  mobile: "#a78bfa",   // violet
  ml: "#f472b6",       // pink
  devops: "#34d399",   // emerald
};

export default techStack;
