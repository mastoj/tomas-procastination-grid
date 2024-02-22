import { Project, EmployeeRecord } from "./types";

// Generate a list of 4 projects
const projects: Project[] = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
  { id: 4, name: "Project 4" },
];

// Generate a list of 20 employees
const employees: EmployeeRecord[] = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  name: `Employee ${i + 1}`,
  allocationPercentage: Math.floor(Math.random() * 100),
  allocationHours: Math.floor(Math.random() * 100),
  project: projects[Math.floor(Math.random() * projects.length)].name,
  role: Math.random() > 0.5 ? "Developer" : "Designer",
}));

// Fake db call
export const getProjects = async (): Promise<Project[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(projects);
    }, 1000);
  });
};

// Fake db call
export const getEmployees = async (): Promise<EmployeeRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(employees);
    }, 1000);
  });
};
