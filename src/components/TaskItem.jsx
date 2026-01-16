import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteTask, toggleTask, updateTask } from '../redux/taskSlice'

function TaskItem({ task }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [text, setText] = useState(task.text)

  function handleUpdate() {
    if (text.trim() === "") return
    dispatch(updateTask({ id: task.id, text }))
    setIsEditing(false)
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </>
      ) : (
        <>
          {/* LEFT SIDE */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />

            {/* Task text */}
            <span className={task.completed ? "completed" : ""}>
              {task.text}
            </span>

            {/* Status label */}
            <small style={{ color: task.completed ? "green" : "orange" }}>
              {task.completed ? "Completed" : "Pending"}
            </small>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button
              className="delete-btn"
              onClick={() => dispatch(deleteTask(task.id))}
              style={{ marginLeft: "5px" }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default TaskItem
