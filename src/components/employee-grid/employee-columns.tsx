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
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import EmployeeEditModal from "./employee-edit-modal";
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "name",
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "project",
      enableGlobalFilter: true,
    },
    {
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      accessorKey: "role",
      enableGlobalFilter: true,
    },
    {
      header: () => <div className="text-left font-bold">Allocation (%)</div>,
      accessorKey: "allocationPercentage",
      enableGlobalFilter: false,
    },
    {
      header: () => <div className="text-left font-bold">Allocation (hrs)</div>,
      accessorKey: "allocationHours",
      enableGlobalFilter: false,
    },
    {
      id: "actions",
      cell: ({ row }) => <ActionCell row={row} setAction={setAction} />,
      enableGlobalFilter: false,
    },
  ];
};
