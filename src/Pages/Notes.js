import React, { useState, useEffect } from "react";
import "../Styles/Notes.css";

const Notes = ({ darkMode }) => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Welcome Note",
            content:
              "Welcome to Notes! Click 'New Note' to create your first note.\n\nYou can:\n• Write and edit text\n• Save automatically\n• Create multiple notes\n• Delete notes you don't need\n\nHappy note-taking! 📝",
            timestamp: new Date().toISOString(),
          },
        ];
  });
  const [currentNote, setCurrentNote] = useState(notes[0]?.id || null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: "Untitled Note",
      content: "",
      timestamp: new Date().toISOString(),
    };
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote.id);
  };

  const updateNote = (id, field, value) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, [field]: value } : note))
    );
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    if (currentNote === id) {
      setCurrentNote(newNotes[0]?.id || null);
    }
  };

  const getCurrentNote = () => {
    return notes.find((note) => note.id === currentNote);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`notes-app ${darkMode ? "dark-mode" : ""}`}>
      <div className="notes-sidebar">
        <div className="notes-header">
          <h2>Notes</h2>
          <button className="new-note-btn" onClick={createNewNote}>
            New Note
          </button>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`note-item ${currentNote === note.id ? "active" : ""}`}
              onClick={() => setCurrentNote(note.id)}
            >
              <div className="note-title">{note.title}</div>
              <div className="note-preview">
                {note.content.substring(0, 50)}
                {note.content.length > 50 ? "..." : ""}
              </div>
              <div className="note-date">{formatDate(note.timestamp)}</div>
              <button
                className="delete-note-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="notes-content">
        {currentNote ? (
          <div className="note-editor">
            <input
              type="text"
              className="note-title-input"
              value={getCurrentNote()?.title || ""}
              onChange={(e) => updateNote(currentNote, "title", e.target.value)}
              placeholder="Note title..."
            />
            <textarea
              className="note-content-input"
              value={getCurrentNote()?.content || ""}
              onChange={(e) =>
                updateNote(currentNote, "content", e.target.value)
              }
              placeholder="Start writing your note..."
              autoFocus
            />
          </div>
        ) : (
          <div className="no-note-selected">
            <h3>No Note Selected</h3>
            <p>Select a note from the sidebar or create a new one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
