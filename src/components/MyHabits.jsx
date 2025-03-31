import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyHabits.css";

const MyHabits = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [updatedHabit, setUpdatedHabit] = useState({
    activityName: "",
    activityType: "",
    startTime: "",
    endTime: "",
  });
  const [loading, setLoading] = useState(false);  // State to handle loading
  const [error, setError] = useState("");  // Error state to handle any fetch/update errors

  useEffect(() => {
    fetchHabits();
  }, []);

  // Fetch habits from backend
  const fetchHabits = async () => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      if (!username) return;

      const response = await axios.get(`http://localhost:8080/activity/user/${username}`);
      setHabits(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching habits:", error);
      setError("Failed to fetch habits. Please try again.");
      setLoading(false);
    }
  };

  // Mark habit as completed
  const completeHabit = async (activityId) => {
    setLoading(true);
    try {
      const username = localStorage.getItem("username");
      await axios.post(`http://localhost:8080/habit/complete/${username}/${activityId}`);

      // Update habit completion status in UI
      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit.id === activityId
            ? { ...habit, completed: true, lastCompleted: new Date().toLocaleTimeString() }
            : habit
        )
      );
      setLoading(false);
    } catch (error) {
      console.error("Error completing habit:", error);
      setError("Failed to mark habit as completed.");
      setLoading(false);
    }
  };

  // Check if the current time is within the scheduled habit time
  const isWithinSchedule = (habit) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const startTimeParts = habit.startTime.split(":");
    const endTimeParts = habit.endTime.split(":");

    const startTimeMinutes = parseInt(startTimeParts[0]) * 60 + parseInt(startTimeParts[1]);
    const endTimeMinutes = parseInt(endTimeParts[0]) * 60 + parseInt(endTimeParts[1]);

    return currentTime >= startTimeMinutes && currentTime <= endTimeMinutes;
  };

  // Delete a habit
  const removeHabit = async (activityId) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/activity/delete/${activityId}`);
      
      // Update state to remove the deleted habit from UI
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== activityId));
      setLoading(false);
    } catch (error) {
      console.error("Error deleting habit:", error);
      setError("Failed to delete habit.");
      setLoading(false);
    }
  };

  // Open Edit Habit Modal
  const handleEditClick = (habit) => {
    setSelectedHabit(habit);
    setUpdatedHabit({
      activityName: habit.activityName,
      activityType: habit.activityType,
      startTime: habit.startTime,
      endTime: habit.endTime,
    });
    setShowEditModal(true);
  };

  // Update habit in backend
  const updateHabit = async () => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/activity/update/${selectedHabit.id}`, updatedHabit);
      setHabits(habits.map((habit) => (habit.id === selectedHabit.id ? { ...habit, ...updatedHabit } : habit)));
      setShowEditModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      setError("Failed to update habit.");
      setLoading(false);
    }
  };

  return (
    <Container className="my-habits-container">
      <div className="my-habits-content">
        <h2 className="title">My Habits 📌</h2>

        {loading && <Spinner animation="border" variant="primary" />}
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        {habits.length > 0 ? (
          habits.map((habit) => (
            <Card key={habit.id} className="habit-card">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="habit-name">{habit.activityName}</h5>
                  <p className="habit-time">
                    🕒 {habit.startTime} - {habit.endTime}
                  </p>
                  {habit.completed && (
                    <p className="habit-completed">✅ Completed at {habit.lastCompleted || "N/A"}</p>
                  )}
                </div>
                <div>
                  {!habit.completed && (
                    <Button
                      variant="success"
                      size="sm"
                      className="complete-btn me-2"
                      onClick={() => completeHabit(habit.id)}
                      disabled={!isWithinSchedule(habit)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button variant="outline-warning" size="sm" className="edit-btn me-2" onClick={() => handleEditClick(habit)}>
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="remove-btn"
                    onClick={() => removeHabit(habit.id)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No habits added yet. Start tracking your habits now!</p>
        )}

        <Button variant="primary" className="add-habit-btn" onClick={() => navigate("/add-habit")}>
          + Add New Habit
        </Button>
      </div>

      {/* Edit Habit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedHabit.activityName}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, activityName: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Habit Type</Form.Label>
              <Form.Control
                type="text"
                value={updatedHabit.activityType}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, activityType: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={updatedHabit.startTime}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, startTime: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={updatedHabit.endTime}
                onChange={(e) => setUpdatedHabit({ ...updatedHabit, endTime: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateHabit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyHabits;
