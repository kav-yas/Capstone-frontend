import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/goals.css";

const Goals = () => {
  const { username } = useParams(); // Get username from URL
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    goalName: "",
    description: "",
    startDate: "",
    targetDate: "",
    milestones: [],
  });
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [progress, setProgress] = useState("");

  useEffect(() => {
    fetchGoals();
  }, []);

  // 📌 Fetch all goals
  const fetchGoals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/goals/${username}`);
      setGoals(response.data);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  // 📌 Create a new goal
  const handleCreateGoal = async () => {
    if (!newGoal.goalName.trim()) return;
    try {
      await axios.post(`http://localhost:8080/habit/goals/create/${username}`, newGoal);
      setNewGoal({ goalName: "", description: "", startDate: "", targetDate: "", milestones: [] });
      fetchGoals();
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  // 📌 View goal details
  const handleViewGoal = async (goalId) => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/goals/details/${goalId}`);
      setSelectedGoal(response.data);
    } catch (error) {
      console.error("Error fetching goal details:", error);
    }
  };

  // 📌 Update goal progress
  const handleUpdateProgress = async (goalId) => {
    if (!progress) return;
    try {
      await axios.patch(`http://localhost:8080/habit/goals/update/${goalId}`, { progress: parseInt(progress) });
      setProgress("");
      fetchGoals();
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // 📌 Mark goal as complete
  const handleCompleteGoal = async (goalId) => {
    try {
      await axios.patch(`http://localhost:8080/habit/goals/complete/${goalId}`);
      fetchGoals();
    } catch (error) {
      console.error("Error completing goal:", error);
    }
  };

  // 📌 Delete a goal
  const handleDeleteGoal = async (goalId) => {
    try {
      await axios.patch(`http://localhost:8080/habit/goals/delete/${goalId}`);
      fetchGoals();
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <div className="goals-container">
      <h2>{username}'s Goals 🎯</h2>

      {/* 🔹 Create New Goal */}
      <div className="goal-create">
        <input
          type="text"
          placeholder="Goal Name"
          value={newGoal.goalName}
          onChange={(e) => setNewGoal({ ...newGoal, goalName: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
        />
        <input
          type="date"
          value={newGoal.startDate}
          onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
        />
        <input
          type="date"
          value={newGoal.targetDate}
          onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
        />
        <input
          type="text"
          placeholder="Milestones (comma separated)"
          value={newGoal.milestones}
          onChange={(e) =>
            setNewGoal({ ...newGoal, milestones: e.target.value.split(",").map(Number) })
          }
        />
        <button onClick={handleCreateGoal}>Create Goal</button>
      </div>

      {/* 🔹 Goals List */}
      <div className="goal-list">
        {goals.length === 0 ? (
          <p>No goals set yet. Start setting your goals now!</p>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="goal-item">
              <h3>{goal.goalName}</h3>
              <p>{goal.description}</p>
              <p>
                Progress: {goal.progress}/{goal.milestones.length}
              </p>
              <button onClick={() => handleViewGoal(goal.id)}>View Details</button>
              <input
                type="number"
                placeholder="Update Progress"
                value={progress}
                onChange={(e) => setProgress(e.target.value)}
              />
              <button onClick={() => handleUpdateProgress(goal.id)}>Update</button>
              <button onClick={() => handleCompleteGoal(goal.id)}>Complete</button>
              <button onClick={() => handleDeleteGoal(goal.id)}>Delete</button>
            </div>
          ))
        )}
      </div>

      {/* 🔹 Goal Details */}
      {selectedGoal && (
        <div className="goal-details">
          <h3>{selectedGoal.goalName}</h3>
          <p>{selectedGoal.description}</p>
          <p>Start Date: {selectedGoal.startDate}</p>
          <p>Target Date: {selectedGoal.targetDate}</p>
          <p>Milestones: {selectedGoal.milestones.join(", ")}</p>
          <button onClick={() => setSelectedGoal(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default Goals;
