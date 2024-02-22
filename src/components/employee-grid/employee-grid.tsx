"use client";
import React, { useState } from "react";
import { getEmployees, getProjects } from "./data";
import { getColumns } from "./employee-columns";
import { EmployeeTable } from "./employee-table";
import { EmployeeRecord, Project } from "./types";

type Props = {
  defaultEmployees: EmployeeRecord[];
  defaultProjects: Project[];
};

const EmployeeGrid = ({ defaultEmployees }: Props) => {
  const [employees, setEmployees] = useState(defaultEmployees);
  const columns = getColumns(setEmployees);
  return <EmployeeTable columns={columns} data={employees} />;
};

export default EmployeeGrid;
