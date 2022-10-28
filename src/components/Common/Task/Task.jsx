import React from "react";
import classStyle from "./Task.module.css";
export default function Task({ name, details, provided,id ,handleDelete}) {
  return (
    <div
      className={classStyle.contain}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <p className={classStyle.name}>{name}</p>
      <p className={classStyle.details}>{details}</p>
      <div className={classStyle.delete} onClick={()=>handleDelete(id)}>-</div>
    </div>
  );
}
