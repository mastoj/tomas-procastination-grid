import React, { useState } from "react";
import { EmployeeRecordCard } from "./types";
import { Draggable } from "@hello-pangea/dnd";
import EmployeeEditModal from "./employee-edit-modal";

type Props = {
  index: number;
  data: EmployeeRecordCard;
};

const EmployeeCard = ({ index, data }: Props) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <Draggable draggableId={data.data.id.toString()} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            role="button"
            onClick={() => setEditing(!editing)}
            className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm text-black"
          >
            {data.data.name} - {data.data.role} (
            {data.data.allocationPercentage}
            %)
          </div>
        )}
      </Draggable>
      <EmployeeEditModal
        open={editing}
        onOpenChange={setEditing}
        record={data.data}
        setAction={() => {}}
      />
    </>
  );
};

export default EmployeeCard;
