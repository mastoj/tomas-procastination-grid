import { Project, EmployeeRecord, Role } from "./types";

// Generate a list of 4 projects
const projects: Project[] = [
  { id: 1, name: "Project 1" },
  { id: 2, name: "Project 2" },
  { id: 3, name: "Project 3" },
  { id: 4, name: "Project 4" },
];

// Get a random first name from a list of 13 names
const getFirstName = () => {
  const firstNames = [
    "Marius",
    "Håkon",
    "Andreas",
    "Mads",
    "Eirik",
    "Thomas",
    "Jonas",
    "Lars",
    "Ole",
    "Kjetil",
    "Pål",
    "Per",
    "Geir",
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

// Get a random last name from a list of 13 names
const getLastName = () => {
  const lastNames = [
    "Rødde",
    "Bjørn",
    "Hansen",
    "Johansen",
    "Olsen",
    "Larsen",
    "Andersen",
    "Nilsen",
    "Pedersen",
    "Kristiansen",
    "Karlsen",
    "Johnsen",
    "Eriksen",
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};
// Generate a list of 20 employees where the name field is using a random first and last name
const employees: EmployeeRecord[] = Array.from({ length: 20 }, (_, i) => {
  return {
    id: i + 1,
    name: `${getFirstName()} ${getLastName()}`,
    allocationPercentage: Math.floor(Math.random() * 100),
    allocationHours: Math.floor(Math.random() * 100),
    project: projects[Math.floor(Math.random() * projects.length)].name,
    role: ["Developer", "Designer", "Manager"][
      Math.floor(Math.random() * 3)
    ] as Role,
  };
});

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
