import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Draggable } from "react-beautiful-dnd";

const Board = ({ section, provided, setSections }) => {
    const [showForm, setShowForm] = useState(false);
    const [taskForm, setTaskForm] = useState({
      name: "",
      description: "",
      dueDate: "",
      assignee: "",
    });
  
    const addTask = () => {
      if (!taskForm.name) return;
  
      const newTask = { id: `task-${Date.now()}`, ...taskForm };
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === section.id ? { ...sec, tasks: [...sec.tasks, newTask] } : sec
        )
      );
      setTaskForm({ name: "", description: "", dueDate: "", assignee: "" });
      setShowForm(false);
    };
  
    const deleteTask = (taskId) => {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === section.id
            ? { ...sec, tasks: sec.tasks.filter((task) => task.id !== taskId) }
            : sec
        )
      );
    };
  
    const updateTask = (taskId, updatedTask) => {
      setSections((prev) =>
        prev.map((sec) =>
          sec.id === section.id
            ? {
                ...sec,
                tasks: sec.tasks.map((task) =>
                  task.id === taskId ? { ...task, ...updatedTask } : task
                ),
              }
            : sec
        )
      );
    };
  
    return (
      <div className="board">
        <h2>{section.title}</h2>
        <div ref={provided.innerRef} {...provided.droppableProps} className="tasks">
          {section.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <TaskCard
                  task={task}
                  provided={provided}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
          {showForm && (
            <div className="task-form">
              <input
                type="text"
                placeholder="Task Name"
                value={taskForm.name}
                onChange={(e) => setTaskForm({ ...taskForm, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                value={taskForm.description}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, description: e.target.value })
                }
              />
              <input
                type="date"
                value={taskForm.dueDate}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, dueDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Assignee"
                value={taskForm.assignee}
                onChange={(e) =>
                  setTaskForm({ ...taskForm, assignee: e.target.value })
                }
              />
              <button onClick={addTask}>Add Task</button>
            </div>
          )}
          {!showForm && (
            <button className="add-task-btn" onClick={() => setShowForm(true)}>
              + Add Task
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default Board;
  