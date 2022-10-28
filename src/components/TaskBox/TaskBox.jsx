import React from "react";
import classStyle from "./TaskBox.module.css";
import Cloum from "../Common/Cloum/Cloum";
import { DragDropContext } from "react-beautiful-dnd";

export default function TaskBox({
  events,
  setEvents,
  currentEvent,
  setCurrentEvent,
}) {
  //删除当前任务
  const deleteEvent = () => {
    if (confirm("You really whant to remove it?")) {
      setEvents((prev) => {
        const result = prev.filter((item) => item.title != currentEvent.title);
        console.log(result.length);
        if (!result.length) {
          const init = [
            {
              title: "Add a New Event",
              ["To Do"]: [],
              ["In Progress"]: [],
              ["Done"]: [],
            },
          ];
          setEvents(init);
        } else {
          setCurrentEvent(result[0]);
        }
        return result;
      });
    }
  };

  //移动盒子的触发事件
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const curEvent = events.find((item) => item.title === currentEvent.title);
    const taskCopy = curEvent[source.droppableId][source.index];
    setEvents((events) => {
      return events.map((event) => {
        if (event.title === currentEvent.title) {
          //删除原来的事件
          let eventCopy = { ...event };
          const tasksSource = eventCopy[source.droppableId];
          tasksSource.splice(source.index, 1);
          eventCopy = { ...eventCopy, [source.droppableId]: tasksSource };

          //移动到指定位置
          const tasksDes = eventCopy[destination.droppableId];
          tasksDes.splice(destination.index, 0, taskCopy);
          eventCopy = { ...eventCopy, [destination.droppableId]: tasksDes };
          return eventCopy;
        } else {
          return event;
        }
      });
    });
  };
  return (
    <div className={classStyle.TaskBox}>
      <header className={classStyle.header}>
        <span>All Tasks</span>
        {/* 删除当前事件按钮 */}
        <div className={classStyle.delete} onClick={deleteEvent}>
          Remove this Event
        </div>
      </header>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div className={classStyle.contain}>
          {
            //遍历当前事件的三个状态
            ["To Do", "In Progress", "Done"].map((tag) => {
              return (
                <Cloum
                  tag={tag}
                  events={events}
                  setEvents={setEvents}
                  currentEvent={currentEvent}
                />
              );
            })
          }
        </div>
      </DragDropContext>
    </div>
  );
}
