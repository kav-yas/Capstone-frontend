import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/journal.css";

const Journal = () => {
  const username = localStorage.getItem("username");
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [updateEntry, setUpdateEntry] = useState({ id: null, content: "" });

  useEffect(() => {
    fetchEntries();
  }, []);

  // 📌 Fetch all journal entries
  const fetchEntries = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/journal/all/${username}`);
      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching entries:", error);
    }
  };

  // 📌 Create a new journal entry
  const handleCreateEntry = async () => {
    if (!newEntry.trim()) return;
    try {
      await axios.post(`http://localhost:8080/journal/create/${username}`, newEntry, {
        headers: { "Content-Type": "text/plain" },
      });
      setNewEntry(""); // Clear input
      fetchEntries(); // Refresh entries
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  // 📌 Filter journal entries by date
  const handleFilterByDate = async () => {
    if (!dateFilter) return;
    try {
      const response = await axios.get(`http://localhost:8080/journal/date/${username}/${dateFilter}`);
      setEntries(response.data);
    } catch (error) {
      console.error("Error filtering entries:", error);
    }
  };

  // 📌 Update a journal entry
  const handleUpdateEntry = async () => {
    if (!updateEntry.content.trim()) return;
    try {
      await axios.put(`http://localhost:8080/journal/update/${username}/${updateEntry.id}`, updateEntry.content, {
        headers: { "Content-Type": "text/plain" },
      });
      setUpdateEntry({ id: null, content: "" });
      fetchEntries(); // Refresh entries
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  // 📌 Delete a journal entry
  const handleDeleteEntry = async (entryId) => {
    try {
      await axios.delete(`http://localhost:8080/journal/delete/${username}/${entryId}`);
      fetchEntries(); // Refresh entries
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div className="journal-container">
      <h2>{username}'s Journal 📖</h2>

      {/* 🔹 Create New Entry */}
      <div className="journal-create">
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Write your journal entry..."
        />
        <button onClick={handleCreateEntry}>Create Entry</button>
      </div>

      {/* 🔹 Filter by Date */}
   

      {/* 🔹 Journal Entries List */}
      <div className="journal-entries">
        {entries.length === 0 ? (
          <p>No journal entries found.</p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="journal-entry">
              <p>{entry.content}</p>
              <small>{entry.entryDate}</small>
              <button onClick={() => setUpdateEntry({ id: entry.id, content: entry.content })}>
                Edit
              </button>
              <button onClick={() => handleDeleteEntry(entry.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Update Journal Entry */}
      {updateEntry.id && (
        <div className="journal-update">
          <textarea
            value={updateEntry.content}
            onChange={(e) =>
              setUpdateEntry({ ...updateEntry, content: e.target.value })
            }
          />
          <button onClick={handleUpdateEntry}>Update Entry</button>
        </div>
      )}
    </div>
  );
};

export default Journal;
