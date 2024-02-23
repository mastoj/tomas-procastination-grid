import React from "react";
import { EmployeeRecord, EmployeeRecordCard, ListWithCards } from "./types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import EmployeeBoardColumn from "./employee-board-column";

type BoardProps = {
  data: EmployeeRecord[];
  filter: string;
};

type Props = {};

const createLists = (data: EmployeeRecord[]): ListWithCards[] => {
  const lists: ListWithCards[] = [];
  const projects = Array.from(new Set(data.map((d) => d.project)));
  projects.forEach((project) => {
    const employees = data.filter((d) => d.project === project);
    const cards = employees.map(
      (employee) =>
        ({
          type: "card",
          data: employee,
        } as EmployeeRecordCard)
    );
    lists.push({
      type: "list",
      title: project,
      data: cards,
    });
  });
  return lists;
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

type DropArea = { droppableId: string; index: number };
const EmployeeBoard = ({ data, filter }: BoardProps) => {
  const lists = createLists(data);
  const [filteredLists, setFilteredLists] = React.useState(lists);
  const onDragEnd = (result: any) => {
    console.log(result);
    const { destination, source, type } = result;

    if (!destination) {
      return;
    }

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "card") {
      let newOrderedData = [...filteredLists];

      // Source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.title === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.title === destination.droppableId
      );

      if (!sourceList || !destList) {
        return;
      }

      // Check if cards exists on the sourceList
      if (!sourceList.data) {
        sourceList.data = [];
      }

      // Check if cards exists on the destList
      if (!destList.data) {
        destList.data = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.data,
          source.index,
          destination.index
        );

        // reorderedCards.forEach((card, idx) => {
        //   card.order = idx;
        // });

        sourceList.data = reorderedCards;

        setFilteredLists(newOrderedData);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: reorderedCards,
        // });
        // User moves the card to another list
      } else {
        // Remove card from the source list
        const [movedCard] = sourceList.data.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.type = destination.droppableId;

        // Add card to the destination list
        destList.data.splice(destination.index, 0, movedCard);

        // sourceList.data.forEach((card, idx) => {
        //   card.order = idx;
        // });

        // Update the order for each card in the destination list
        // destList.data.forEach((card, idx) => {
        //   card.order = idx;
        // });

        setFilteredLists(newOrderedData);
        // executeUpdateCardOrder({
        //   boardId: boardId,
        //   items: destList.cards,
        // });
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {filteredLists.map((list, index) => {
              return (
                <EmployeeBoardColumn
                  key={list.title}
                  index={index}
                  data={list}
                />
              );
            })}
            {provided.placeholder}
            {/* <ListForm /> */}
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default EmployeeBoard;
