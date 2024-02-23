import React from "react";
import { ListWithCards } from "./types";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import EmployeeCard from "./employee-card";

type Props = {
  data: ListWithCards;
  index: number;
};

const EmployeeBoardColumn = ({ data, index }: Props) => {
  return (
    <Draggable draggableId={data.title} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <h2 className="px-3 pt-2 text-black">{data.title}</h2>
            <Droppable droppableId={data.title} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.data.length > 0 ? "mt-2" : "mt-0"
                  )}
                >
                  {data.data.map((card, index) => (
                    <EmployeeCard
                      index={index}
                      key={card.data.id}
                      data={card}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            {/* <CardForm
            listId={data.id}
            ref={textareaRef}
            isEditing={isEditing}
            enableEditing={enableEditing}
            disableEditing={disableEditing}
          /> */}
          </div>
        </li>
      )}
    </Draggable>
  );
};

export default EmployeeBoardColumn;
