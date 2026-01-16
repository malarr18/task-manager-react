import { createSlice } from '@reduxjs/toolkit'

const savedTasks = localStorage.getItem("tasks")
const initialState = savedTasks ? JSON.parse(savedTasks) : []

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      })
      localStorage.setItem("tasks", JSON.stringify(state))
    },

    deleteTask: (state, action) => {
      const updated = state.filter(task => task.id !== action.payload)
      localStorage.setItem("tasks", JSON.stringify(updated))
      return updated
    },

    toggleTask: (state, action) => {
      const task = state.find(task => task.id === action.payload)
      if (task) task.completed = !task.completed
      localStorage.setItem("tasks", JSON.stringify(state))
    },

    updateTask: (state, action) => {
      const { id, text } = action.payload
      const task = state.find(task => task.id === id)
      if (task) task.text = text
      localStorage.setItem("tasks", JSON.stringify(state))
    }
  }
})

export const { addTask, deleteTask, toggleTask, updateTask } = taskSlice.actions
export default taskSlice.reducer
