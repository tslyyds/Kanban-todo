import React from "react";
import classStyle from "./AddEventButton.module.css";
export default function AddButton(props) {

  return <div className={classStyle.AddButton} onClick={props.ClickHandler}>+</div>;
}
