import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../redux/taskSlice'

function TaskForm() {
  const [text, setText] = useState("")
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === "") return

    dispatch(addTask(text))
    setText("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="add-btn">Add</button>
    </form>
  )
}

export default TaskForm
