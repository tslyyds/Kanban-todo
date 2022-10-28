import "./App.css";
import TaskBox from "./components/TaskBox/TaskBox";
import EventBar from "./components/EventBar/EventBar";
import { useEffect, useState, useCallback } from "react";
function App() {
  //任务列表
  const [events, setEvents] = useState(() => {
    return localStorage.getItem("events")
      ? JSON.parse(localStorage.getItem("events"))
      : [
          {
            title: "Add a New Event",
            ["To Do"]: [],
            ["In Progress"]: [],
            ["Done"]: [],
          },
        ];
  });
  const updateEvents = useCallback(() => {
    try {
      if (!events.length) {
         localStorage.setItem(
          "events",
          JSON.stringify([
            {
              title: "Add a New Event",
              ["To Do"]: [],
              ["In Progress"]: [],
              ["Done"]: [],
            },
          ])
        );
        setEvents(JSON.parse(localStorage.getItem("events")));
      } else {
        localStorage.setItem("events", JSON.stringify(events));
      }
    } catch (error) {
      console.log(error);
    }
  });
  useEffect(updateEvents, [events]);
  // const [events, setEvents] = useState([
  //   {
  //     title: "Battleship",
  //     ["To Do"]: [
  //       {
  //         id: uuid(),
  //         name: "Something1",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //     ["In Progress"]: [
  //       {
  //         id: uuid(),
  //         name: "Something2",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //     ["Done"]: [
  //       {
  //         id: uuid(),
  //         name: "Something3",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Reading",
  //     ["To Do"]: [
  //       {
  //         id: uuid(),
  //         name: "Something1",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //     ["In Progress"]: [
  //       {
  //         id: uuid(),
  //         name: "Something2",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //     ["Done"]: [
  //       {
  //         id: uuid(),
  //         name: "Something3",
  //         details: "SomethingSomethingSomething",
  //       },
  //     ],
  //   },
  // ]);
  //当前选中的任务,默认是第一个
  const [currentEvent, setCurrentEvent] = useState(events[0]);

  return (
    <div className="App">
      <EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      ></EventBar>
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      ></TaskBox>
    </div>
  );
}

export default App;
