"use client";
import React, { useState } from "react";
import { getEmployees, getProjects } from "./data";
import { getColumns } from "./employee-columns";
import { EmployeeTable } from "./employee-table";
import { EmployeeRecord, Project } from "./types";
import { useDebounce } from "@uidotdev/usehooks";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Grid3X3Icon, ListIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import EmployeeBoard from "./employee-board";

const ViewToggleButton = ({
  onClick,
  currentView,
}: {
  onClick: () => void;
  currentView: "table" | "grid";
}) => {
  return (
    <Button variant="outline" size="icon" onClick={onClick}>
      <ListIcon
        className={cn(
          "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all",
          currentView == "grid" && "-rotate-90 scale-0"
        )}
      />
      <Grid3X3Icon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all",
          currentView == "grid" && "-rotate-90 scale-100"
        )}
      />
      <span className="sr-only">Toggle view</span>
    </Button>
  );
};

type Props = {
  defaultEmployees: EmployeeRecord[];
  defaultProjects: Project[];
};

const EmployeeGrid = ({ defaultEmployees }: Props) => {
  const [view, setView] = useState<"table" | "grid">("table");
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 500);
  const [employees, setEmployees] = useState(defaultEmployees);
  const columns = getColumns(setEmployees);
  const toggleView = () => setView(view === "table" ? "grid" : "table");
  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filter table..."
          onChange={(event) => setFilter(String(event.target.value))}
          className="max-w-sm"
        />
        <ViewToggleButton onClick={toggleView} currentView={view} />
      </div>
      {view === "table" ? (
        <EmployeeTable
          columns={columns}
          data={employees}
          filter={debouncedFilter}
        />
      ) : (
        <EmployeeBoard data={employees} filter={debouncedFilter} />
      )}
    </div>
  );
};

export default EmployeeGrid;
