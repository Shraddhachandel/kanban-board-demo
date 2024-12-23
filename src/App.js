import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Board from "./components/Board";
import "./App.css";

const App = () => {
  const [sections, setSections] = useState([
    { id: "todo", title: "To do", tasks: [] },
    { id: "in-progress", title: "In Progress", tasks: [] },
    { id: "done", title: "Done", tasks: [] },
  ]);

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: `New Section`,
      tasks: [],
    };
    setSections([...sections, newSection]);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceSection = sections.find(
        (section) => section.id === source.droppableId
      );
      const destSection = sections.find(
        (section) => section.id === destination.droppableId
      );

      const sourceTasks = [...sourceSection.tasks];
      const destTasks = [...destSection.tasks];
      const [movedTask] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, movedTask);

      setSections(
        sections.map((section) =>
          section.id === source.droppableId
            ? { ...section, tasks: sourceTasks }
            : section.id === destination.droppableId
            ? { ...section, tasks: destTasks }
            : section
        )
      );
    }
  };

  return (
    <div className="App">
     
      <header className="app-header">
        <div className="header-right">
          <input
            type="text"
            placeholder="Search..."
            disabled
          />
          <button className="settings-btn">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/settings.png"
              alt="Settings"
            />
          </button>
        </div>
      </header>

      <header className="header">
      
        <button className="add-section-btn" onClick={addSection}>
          + Add Section
        </button>
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="boards-container">
          {sections.map((section) => (
            <Droppable key={section.id} droppableId={section.id}>
              {(provided) => (
                <Board
                  section={section}
                  provided={provided}
                  setSections={setSections}
                />
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
