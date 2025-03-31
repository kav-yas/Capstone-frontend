import React, { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/MyHabits.css";

const MyHabits = () => {
  const navigate = useNavigate();
  const [habitList, setHabitList] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentHabit, setCurrentHabit] = useState(null);
  const [habitData, setHabitData] = useState({
    name: "",
    type: "",
    start: "",
    end: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setIsLoading(true);
    try {
      const user = localStorage.getItem("username");
      if (!user) return;

      const response = await axios.get(`http://localhost:8080/activity/user/${user}`);
      setHabitList(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading habits:", error);
      setFetchError("Unable to load habits. Try again.");
      setIsLoading(false);
    }
  };

  const markAsComplete = async (habitId) => {
    setIsLoading(true);
    try {
      const user = localStorage.getItem("username");
      await axios.post(`http://localhost:8080/habit/complete/${user}/${habitId}`);

      setHabitList((prev) =>
        prev.map((habit) =>
          habit.id === habitId
            ? { ...habit, completed: true, lastDone: new Date().toLocaleTimeString() }
            : habit
        )
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error completing habit:", error);
      setFetchError("Could not complete habit.");
      setIsLoading(false);
    }
  };

  const isScheduledNow = (habit) => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const start = habit.start.split(":");
    const end = habit.end.split(":");

    const startMinutes = parseInt(start[0]) * 60 + parseInt(start[1]);
    const endMinutes = parseInt(end[0]) * 60 + parseInt(end[1]);

    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
  };

  const deleteHabit = async (habitId) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8080/activity/delete/${habitId}`);
      setHabitList((prev) => prev.filter((habit) => habit.id !== habitId));
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting habit:", error);
      setFetchError("Could not delete habit.");
      setIsLoading(false);
    }
  };

  const openEditModal = (habit) => {
    setCurrentHabit(habit);
    setHabitData({
      name: habit.activityName,
      type: habit.activityType,
      start: habit.startTime,
      end: habit.endTime,
    });
    setEditModalVisible(true);
  };

  const saveHabitChanges = async () => {
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:8080/activity/update/${currentHabit.id}`, habitData);
      setHabitList(habitList.map((habit) => (habit.id === currentHabit.id ? { ...habit, ...habitData } : habit)));
      setEditModalVisible(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating habit:", error);
      setFetchError("Could not update habit.");
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-habits-container">
      <div className="my-habits-content">
        <h2 className="title">My Habits 📌</h2>

        {isLoading && <Spinner animation="border" variant="primary" />}
        {fetchError && <p className="error-message">{fetchError}</p>}

        {habitList.length > 0 ? (
          habitList.map((habit) => (
            <Card key={habit.id} className="habit-card">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="habit-name">{habit.activityName}</h5>
                  <p className="habit-time">🕒 {habit.startTime} - {habit.endTime}</p>
                  {habit.completed && <p className="habit-completed">✅ Done at {habit.lastDone || "N/A"}</p>}
                </div>
                <div>
                  {!habit.completed && (
                    <Button
                      variant="success"
                      size="sm"
                      className="complete-btn me-2"
                      onClick={() => markAsComplete(habit.id)}
                      disabled={!isScheduledNow(habit)}
                    >
                      Complete
                    </Button>
                  )}
                  <Button variant="outline-warning" size="sm" className="edit-btn me-2" onClick={() => openEditModal(habit)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" className="remove-btn" onClick={() => deleteHabit(habit.id)}>
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

      <Modal show={editModalVisible} onHide={() => setEditModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                value={habitData.name}
                onChange={(e) => setHabitData({ ...habitData, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Habit Type</Form.Label>
              <Form.Control
                type="text"
                value={habitData.type}
                onChange={(e) => setHabitData({ ...habitData, type: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                value={habitData.start}
                onChange={(e) => setHabitData({ ...habitData, start: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mt-2">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                type="time"
                value={habitData.end}
                onChange={(e) => setHabitData({ ...habitData, end: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalVisible(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveHabitChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyHabits;
