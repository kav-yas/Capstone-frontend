import React, { useState } from "react";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const AddHabit = () => {
  const [habit, setHabit] = useState("");
  const [activityType, setActivityType] = useState("health");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [message, setMessage] = useState(null);
  const [completed, setCompleted] = useState(false); // New state to track if the habit is completed

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("username"); // Get username from storage

    if (!username) {
      setMessage({ type: "danger", text: "User not logged in! Please log in first." });
      return; // Stop if no username
    }

    const habitData = {
      activityName: habit,
      activityType,
      startTime,
      endTime,
    };

    try {
      const response = await axios.post(`http://localhost:8080/activity/add/${username}`, habitData);
      setMessage({ type: "success", text: `Habit "${habit}" added successfully!` });
      setHabit("");
      setStartTime("");
      setEndTime("");
      setCompleted(false); // Reset completed status on new habit
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.message || "Failed to add habit." });
      console.error("Error:", error);
    }
  };

  const handleComplete = async () => {
    const username = localStorage.getItem("username");
    const habitData = {
      activityName: habit,
      activityType,
      startTime,
      endTime,
    };

    try {
      // Mark habit as complete regardless of time
      await axios.post(`http://localhost:8080/activity/complete/${username}`, habitData);
      setCompleted(true); // Mark the habit as completed
      setMessage({ type: "success", text: `Habit "${habit}" completed successfully!` });
    } catch (error) {
      setMessage({ type: "danger", text: error.response?.data?.message || "Failed to mark as complete." });
      console.error("Error:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Habit ➕</h2>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Habit Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter habit"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Activity Type</Form.Label>
          <Form.Control as="select" value={activityType} onChange={(e) => setActivityType(e.target.value)}>
            <option value="health">Health</option>
            <option value="productivity">Productivity</option>
            <option value="learning">Learning</option>
            <option value="fitness">Fitness</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>Start Time</Form.Label>
          <Form.Control
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2">
          <Form.Label>End Time</Form.Label>
          <Form.Control
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </Form.Group>

        <Button className="mt-3" type="submit">
          Add Habit
        </Button>
      </Form>

      {/* Show 'Complete Habit' button after the habit is added */}
      {habit && !completed && (
        <Button className="mt-3" variant="success" onClick={handleComplete}>
          ✅ Complete Habit
        </Button>
      )}

      {completed && (
        <Alert variant="success" className="mt-3">
          Habit "{habit}" has been marked as completed!
        </Alert>
      )}
    </Container>
  );
};

export default AddHabit;
