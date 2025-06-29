import React, { useState, useEffect } from "react";
import "../Styles/TaskMaster.css";
import {
  FaClipboardList,
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

const TaskMaster = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all"); // all, active, completed
  const [editingTask, setEditingTask] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("taskMasterTasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("taskMasterTasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        priority: "medium",
      };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditingText(task.text);
  };

  const saveEdit = (taskId) => {
    if (editingText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, text: editingText.trim() } : task
        )
      );
    }
    setEditingTask(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditingText("");
  };

  const setPriority = (taskId, priority) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, priority } : task))
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.filter((task) => !task.completed).length;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#FF3B30";
      case "medium":
        return "#FF9500";
      case "low":
        return "#34C759";
      default:
        return "#007AFF";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "High";
      case "medium":
        return "Medium";
      case "low":
        return "Low";
      default:
        return "Medium";
    }
  };

  return (
    <div className={`taskmaster ${darkMode ? "dark-mode" : "light-mode"}`}>
      <div className="taskmaster-header">
        <div className="taskmaster-title">
          <div className="taskmaster-icon">
            <FaClipboardList size={24} />
          </div>
          <h1>Task Master</h1>
        </div>
        <div className="taskmaster-stats">
          <span className="stat-item">
            <span className="stat-number">{activeCount}</span>
            <span className="stat-label">Active</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">{completedCount}</span>
            <span className="stat-label">Completed</span>
          </span>
        </div>
      </div>

      <div className="taskmaster-content">
        {/* Add Task Form */}
        <form className="add-task-form" onSubmit={addTask}>
          <div className="input-group">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="task-input"
            />
            <button type="submit" className="add-task-btn">
              <span className="add-icon">
                <FaPlus size={16} />
              </span>
            </button>
          </div>
        </form>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-tab ${filter === "active" ? "active" : ""}`}
            onClick={() => setFilter("active")}
          >
            Active ({activeCount})
          </button>
          <button
            className={`filter-tab ${filter === "completed" ? "active" : ""}`}
            onClick={() => setFilter("completed")}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaClipboardList size={48} />
              </div>
              <h3>No tasks found</h3>
              <p>
                {filter === "all"
                  ? "Add your first task to get started!"
                  : filter === "active"
                  ? "No active tasks"
                  : "No completed tasks"}
              </p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`task-item ${
                    task.completed ? "completed" : ""
                  } priority-${task.priority}`}
                >
                  <div className="task-content">
                    <button
                      className="task-checkbox"
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.completed ? (
                        <span className="checkmark">
                          <FaCheck size={12} />
                        </span>
                      ) : (
                        <span className="checkbox"></span>
                      )}
                    </button>

                    <div className="task-text-container">
                      {editingTask === task.id ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onBlur={() => saveEdit(task.id)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") saveEdit(task.id);
                            if (e.key === "Escape") cancelEdit();
                          }}
                          className="edit-task-input"
                          autoFocus
                        />
                      ) : (
                        <span className="task-text">{task.text}</span>
                      )}
                    </div>

                    <div className="task-priority">
                      <div
                        className="priority-indicator"
                        style={{
                          backgroundColor: getPriorityColor(task.priority),
                        }}
                        title={getPriorityLabel(task.priority)}
                      ></div>
                    </div>
                  </div>

                  <div className="task-actions">
                    <div className="priority-dropdown">
                      <button
                        className="priority-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          const currentIndex = [
                            "low",
                            "medium",
                            "high",
                          ].indexOf(task.priority);
                          const nextPriority = ["low", "medium", "high"][
                            (currentIndex + 1) % 3
                          ];
                          setPriority(task.id, nextPriority);
                        }}
                      >
                        <div
                          className="priority-dot"
                          style={{
                            backgroundColor: getPriorityColor(task.priority),
                          }}
                        ></div>
                      </button>
                    </div>

                    <button
                      className="edit-task-btn"
                      onClick={() => startEditing(task)}
                      title="Edit task"
                    >
                      <FaEdit size={16} />
                    </button>

                    <button
                      className="delete-task-btn"
                      onClick={() => deleteTask(task.id)}
                      title="Delete task"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Clear Completed Button */}
        {completedCount > 0 && (
          <div className="clear-completed">
            <button className="clear-completed-btn" onClick={clearCompleted}>
              Clear completed ({completedCount})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskMaster;
