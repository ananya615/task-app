import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([
      ...tasks,
      { text: newTask, done: false, date: new Date().toLocaleString() },
    ]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter((t) => !t.done)
      : tasks.filter((t) => t.done);

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2 className="logo">🧩 TaskApp</h2>
        <nav>
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            📋 All Tasks
          </button>
          <button className={filter === "active" ? "active" : ""} onClick={() => setFilter("active")}>
            🔥 Active
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            ✅ Completed
          </button>
        </nav>
      </aside>

      <main className="content">
        <header className="topbar">
          <h1>Welcome to Your Task Dashboard</h1>
          <p>Plan, track, and organize your day effortlessly ✨</p>
        </header>

        <section className="task-section">
          <div className="task-input">
            <input
              type="text"
              placeholder="Type a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task ➕</button>
          </div>

          <ul className="task-list">
            {filteredTasks.length === 0 && (
              <p className="empty">🕊 No tasks to show here!</p>
            )}
            {filteredTasks.map((task, index) => (
              <li key={index} className={task.done ? "done" : ""}>
                <div className="task-item" onClick={() => toggleTask(index)}>
                  <span className="task-text">{task.text}</span>
                  <small>{task.date}</small>
                </div>
                <button className="delete-btn" onClick={() => deleteTask(index)}>
                  🗑
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
