export type Project = {
  id: number;
  name: string;
};

export type Role = "Developer" | "Designer" | "Manager";

export type EmployeeRecord = {
  id: number;
  name: string;
  allocationPercentage: number;
  allocationHours: number;
  project: string;
  role: Role;
};

export type EmployeeRecordCard = {
  type: "card";
  data: EmployeeRecord;
};

export type ListWithCards = {
  type: "list";
  title: string;
  data: EmployeeRecordCard[];
};
