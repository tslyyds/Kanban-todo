import React from "react";
import classStyle from "./EventBar.module.css";
import AddEventButton from "../Common/AddEventButton/AddEventButton";

export default function EventBar({
  events,
  setEvents,
  currentEvent,
  setCurrentEvent,
}) {
  //点击添加任务名称
  const addEvent = () => {
    const title = prompt("Enter event title");
    if (
      events.find(
        (item) => item.title.toLocaleLowerCase() === title.toLocaleLowerCase()
      )
    ) {
      alert("The event already exists");
      return;
    }
    if (title) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { title: title, ["To Do"]: [], ["In Progress"]: [], ["Done"]: [] },
      ]);
    }
  };
  return (
    <div className={classStyle.EventBar}>
      <h1 className={classStyle.title}>.kanban</h1>
      <div className={classStyle.contain}>
        {/* 添加事件按钮 */}
        <AddEventButton ClickHandler={addEvent}></AddEventButton>
        {events.map((event) => (
          <div
            key={event.title}
            className={`${classStyle.event} ${
              currentEvent.title === event.title ? `${classStyle.selected}` : ""
            }`}
            onClick={() => setCurrentEvent(event)}
          >
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
