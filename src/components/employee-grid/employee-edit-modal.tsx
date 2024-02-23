import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { EmployeeRecord } from "./types";
import EmployeeEditForm from "./employee-edit-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  record: EmployeeRecord;
  setAction: React.Dispatch<React.SetStateAction<EmployeeRecord[]>>;
};

const EmployeeEditModal = ({
  open,
  onOpenChange,
  record,
  setAction,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit employee record</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <EmployeeEditForm
          record={record}
          setAction={setAction}
          close={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeEditModal;
