import React, { useState, useEffect } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import "../styles/ChallengesGoals.css";

const ChallengesGoals = () => {
  const username = localStorage.getItem("username"); // Get logged-in username
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ goalName: "", description: "", startDate: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (username) {
      fetchUserGoals();
    }
  }, [username]);

  const fetchUserGoals = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/goals/${username}`);
      setGoals(response.data);
    } catch (error) {
      setError("Error fetching goals.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (e) => {
    e.preventDefault();

    // Get the current date as the start date
    const currentDate = new Date();
    const startDate = currentDate.toISOString(); // Store the start date in ISO format

    // Progress is 0% when the goal is added
    const progress = 0;

    const goalWithProgress = { ...newGoal, progress, startDate };
    try {
      const response = await axios.post(`http://localhost:8080/goals/create/${username}`, goalWithProgress);
      setGoals([...goals, response.data]);
      setNewGoal({ goalName: "", description: "", startDate: "" }); // Reset form
    } catch (error) {
      setError("Error adding goal.");
    }
  };

  return (
    <Container className="challenges-container">
      <div className="challenges-content">
        <h2 className="title">Challenges & Goals 🎯</h2>

        {/* ✅ User Goals */}
        <h3>🎯 Your Goals</h3>
        {loading ? (
          <Spinner animation="border" />
        ) : goals.length > 0 ? (
          goals.map((goal, index) => (
            <Card key={index} className="goal-card">
              <Card.Body>
                <h5>{goal.goalName}</h5>
                <p>{goal.description}</p>
                <p>Progress: {goal.progress}%</p>
                <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No goals added yet.</p>
        )}

        {/* ✅ Add New Goal */}
        <h3>➕ Add a Goal</h3>
        <Form onSubmit={handleAddGoal} className="goal-form">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Goal Name"
              value={newGoal.goalName}
              onChange={(e) => setNewGoal({ ...newGoal, goalName: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Goal Description"
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Goal
          </Button>
        </Form>

        {/* Display errors */}
        {error && <p className="error-text">{error}</p>}
      </div>
    </Container>
  );
};

export default ChallengesGoals;
