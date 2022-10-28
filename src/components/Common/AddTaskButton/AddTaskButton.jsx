import React from 'react'
import classStyle from './AddTaskButton.module.css'
export default function AddTaskButton({handClick}) {
  return (
    <div className={classStyle.AddButton} onClick={handClick}>+</div>
  )
}
