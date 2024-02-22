import { getEmployees, getProjects } from "@/components/employee-grid/data";
import EmployeeGrid from "@/components/employee-grid/employee-grid";
import Image from "next/image";

export default async function Home() {
  const defaultEmployees = await getEmployees();
  const defaultProjects = await getProjects();

  return (
    <div className="p-4">
      <EmployeeGrid
        defaultEmployees={defaultEmployees}
        defaultProjects={defaultProjects}
      />
    </div>
  );
}
