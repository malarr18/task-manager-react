import { useSelector } from 'react-redux'
import { useState } from 'react'
import TaskItem from './TaskItem'

function TaskList() {
  const tasks = useSelector((state) => state.tasks)

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all") // all | completed | pending

  const filteredTasks = tasks
    .filter(task =>
      task.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter(task => {
      if (filter === "completed") return task.completed
      if (filter === "pending") return !task.completed
      return true
    })

  return (
    <>
      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />

      {/* Filter buttons */}
      <div style={{ marginBottom: "10px" }}>
  <button
    className={`filter-btn ${filter === "all" ? "active" : ""}`}
    onClick={() => setFilter("all")}
  >
    All
  </button>
  <button
    className={`filter-btn ${filter === "pending" ? "active" : ""}`}
    onClick={() => setFilter("pending")}
    style={{ marginLeft: "5px" }}
  >
    Pending
  </button>
  <button
    className={`filter-btn ${filter === "completed" ? "active" : ""}`}
    onClick={() => setFilter("completed")}
    style={{ marginLeft: "5px" }}
  >
    Completed
  </button>
</div>


      <ul>
        {filteredTasks.length === 0 && <p>No tasks found</p>}

        {filteredTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </>
  )
}

export default TaskList
