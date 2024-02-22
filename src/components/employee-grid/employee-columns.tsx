"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { EmployeeRecord } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import EmployeeEditModal from "./employee-edit";
import { useState } from "react";

type ActionCellProps = {
  row: Row<EmployeeRecord>;
  setAction: React.Dispatch<React.SetStateAction<EmployeeRecord[]>>;
};
const ActionCell = ({ row, setAction }: ActionCellProps) => {
  const [showModal, setShowModal] = useState(false);
  const record = row.original;
  const handleDelete = (id: number) => {
    return () => {
      setAction((prev) => prev.filter((item) => item.id !== id));
    };
  };

  return (
    <>
      <EmployeeEditModal
        record={record}
        open={showModal}
        onOpenChange={setShowModal}
        setAction={setAction}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setShowModal(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDelete(row.original.id)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export const getColumns = (
  setAction: React.Dispatch<React.SetStateAction<EmployeeRecord[]>>
): ColumnDef<EmployeeRecord>[] => {
  return [
    {
      header: () => <div className="text-left font-bold">Name</div>,
      accessorKey: "name",
    },
    {
      header: () => <div className="text-left font-bold">Project</div>,
      accessorKey: "project",
    },
    {
      header: () => <div className="text-left font-bold">Role</div>,
      accessorKey: "role",
    },
    {
      header: () => <div className="text-left font-bold">Allocation (%)</div>,
      accessorKey: "allocationPercentage",
    },
    {
      header: () => <div className="text-left font-bold">Allocation (hrs)</div>,
      accessorKey: "allocationHours",
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionCell row={row} setAction={setAction} />,
    },
  ];
};
