import CustomCursor from './components/CustomCursor'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Trash2,
  Plus,
  CheckCircle2,
  Pencil,
  Save,
  X,
} from 'lucide-react'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    fetchTasks()
  }, [])

  async function fetchTasks() {
    const res = await axios.get('http://localhost:5000/tasks')
    setTasks(res.data)
  }

  async function createTask() {
    if (!title) return

    await axios.post('http://localhost:5000/tasks', {
      title,
    })

    setTitle('')
    fetchTasks()
  }

  async function deleteTask(id) {
    await axios.delete(`http://localhost:5000/tasks/${id}`)
    fetchTasks()
  }

  async function updateTask(id) {
  await axios.put(`http://localhost:5000/tasks/${id}`, {
    title: editTitle,
  })

  setEditingId(null)
  setEditTitle('')
  fetchTasks()
}

  return (
    <div className="min-h-screen bg-[#07111f] text-white">
      
      <CustomCursor />
    
      {/* HEADER */}
      <header className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Task<span className="text-cyan-400">Flow</span>
            </h1>

            <p className="text-slate-400 mt-1">
              Modern Task Management Dashboard
            </p>
          </div>

          <div className="bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-2xl">
            <p className="text-cyan-300 text-sm">
              {tasks.length} Tasks
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-5xl mx-auto px-6 py-12">

        {/* CREATE TASK */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-10 shadow-2xl">
          
          <h2 className="text-2xl font-bold mb-6">
            Create New Task
          </h2>

          <div className="flex gap-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              className="flex-1 bg-[#0f172a] border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <button
              onClick={createTask}
              className="bg-cyan-400 text-black font-semibold px-6 rounded-2xl flex items-center gap-2 hover:scale-105 transition"
            >
              <Plus size={18} />
              Add Task
            </button>
          </div>
        </div>

        {/* TASKS */}
        <div className="grid gap-6">
          {tasks.map((task) => (
  <div
    key={task._id}
    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex justify-between items-center hover:border-cyan-400/30 transition"
  >
    <div className="flex items-center gap-4 flex-1">
      <CheckCircle2 className="text-cyan-400" />

      {editingId === task._id ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="flex-1 bg-[#0f172a] border border-cyan-400 rounded-2xl px-4 py-3 outline-none"
        />
      ) : (
        <div>
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>

          <p className="text-slate-400 text-sm mt-1">
            Active task
          </p>
        </div>
      )}
    </div>

    <div className="flex gap-3">
      {editingId === task._id ? (
        <>
          <button
            onClick={() => updateTask(task._id)}
            className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl hover:scale-105 transition"
          >
            <Save size={18} />
          </button>

          <button
            onClick={() => {
              setEditingId(null)
              setEditTitle('')
            }}
            className="bg-gray-500/10 border border-gray-500/20 text-gray-300 p-4 rounded-2xl hover:scale-105 transition"
          >
            <X size={18} />
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setEditingId(task._id)
              setEditTitle(task.title)
            }}
            className="bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 p-4 rounded-2xl hover:scale-105 transition"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => deleteTask(task._id)}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl hover:scale-105 transition"
          >
            <Trash2 size={18} />
          </button>
        </>
      )}
    </div>
  </div>
))}
        </div>
      </main>
    </div>
  )
}

export default App