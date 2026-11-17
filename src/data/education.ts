export type Education = { school: string; program: string; status: string; note: string };

export const education: Education[] = [
  {
    school: "University of Luxembourg",
    program: "Bachelor in Computer Science",
    status: "Sep 2024–present",
    note: "Academic focus: software engineering, machine learning and security.",
  },
  {
    school: "TU Wien",
    program: "Erasmus exchange semester · Informatics",
    status: "Feb–Jul 2026 · Completed · Vienna, Austria",
    note: "Autonomous racing with C++ and Python, including ROS2 coursework.",
  },
  {
    school: "IT Kariera",
    program: "Certificate in Software Development",
    status: "Completed Jul 2024 · Ministry of Education Bulgaria · Plovdiv",
    note: "Two-year programme in C#, MySQL, Haskell and PHP, including C++/Arduino projects.",
  },
];

export const languages = ["Bulgarian — Native", "English — C1"];
