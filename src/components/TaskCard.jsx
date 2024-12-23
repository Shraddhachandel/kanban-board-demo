import React, { useState } from "react";

const TaskCard = ({ task, provided, deleteTask, updateTask }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: task.name,
    description: task.description,
    dueDate: task.dueDate,
    assignee: task.assignee,
  });

  const handleEditSave = () => {
    updateTask(task.id, editForm);
    setIsEditing(false);
  };

  return (
    <div
      className="task-card"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            placeholder="Task Name"
          />
          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            placeholder="Description"
          />
          <input
            type="date"
            value={editForm.dueDate}
            onChange={(e) =>
              setEditForm({ ...editForm, dueDate: e.target.value })
            }
          />
          <input
            type="text"
            value={editForm.assignee}
            onChange={(e) =>
              setEditForm({ ...editForm, assignee: e.target.value })
            }
            placeholder="Assignee"
          />
          <div className="edit-buttons">
            <button onClick={handleEditSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <h3>Task Name - {task.name}</h3>
          <p>Description - {task.description}</p>
          <div className="task-details">
            <span>Due: {task.dueDate}</span><br/>
            <span>Assignee: {task.assignee}</span>
          </div>
          <button
            className="more-btn"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            ...
          </button>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TaskCard;
