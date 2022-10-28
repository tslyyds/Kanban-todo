import React from "react";
import classStyle from "./Cloum.module.css";
import AddTaskButton from "../AddTaskButton/AddTaskButton";
import uuid from "react-uuid";
import Task from "../Task/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function Cloum({ tag, events, setEvents, currentEvent }) {
  //添加工作任务
  const handleAdd = () => {
    const name = prompt("Please input the title of the task");
    const details = prompt("Please input the description of the task");
    if (!(name && details)) return;
    setEvents((prev) => {
      const arrCopy = [...prev];
      const eventIndex = prev.findIndex(
        (item) => item.title == currentEvent.title
      );
      //找到当前事件，删除后重新添加
      const event = arrCopy[eventIndex];
      arrCopy.splice(eventIndex, 1, {
        ...event,
        [tag]: [...event[tag], { id: uuid(), name: name, details: details }],
      });
      return arrCopy;
    });
  };
  //删除工作任务
  const clickDelete = (id) => {
    setEvents((events) => {
      return events.map((event) => {
        if (event.title == currentEvent.title) {
          const tasks = event[tag];
          const index = tasks.findIndex((item) => item.id == id);
          //删除任务
          tasks.splice(index, 1);
          return {
            ...event,
            [tag]: tasks,
          }
        }else{
          return event
        }
      });
    });
  };

  return (
    <div className={classStyle.Cloum}>
      <p className={classStyle.tag}>{tag}</p>
      <AddTaskButton handClick={handleAdd} />
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <div
              className={classStyle.container}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title === currentEvent.title)
                ?.[tag]?.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <Task
                            name={item.name}
                            id={item.id}
                            handleDelete={clickDelete}
                            details={item.details}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        );
                      }}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
