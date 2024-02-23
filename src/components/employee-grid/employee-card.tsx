import React from "react";
import { EmployeeRecordCard } from "./types";
import { Draggable } from "@hello-pangea/dnd";

type Props = {
  index: number;
  data: EmployeeRecordCard;
};

const EmployeeCard = ({ index, data }: Props) => {
  return (
    <Draggable draggableId={data.data.id.toString()} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          // onClick={() => cardModal.onOpen(data.id)}
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm text-black"
        >
          {data.data.name} - {data.data.role} ({data.data.allocationPercentage}
          %)
        </div>
      )}
    </Draggable>
  );
};

export default EmployeeCard;
