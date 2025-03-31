import React, { useState, useEffect } from "react";
import { Container, Card, Button, Spinner, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import "../styles/Notifications.css"; // Ensure this file has the correct styles

const Notifications = () => {
  const username = localStorage.getItem("username");
  const [userReminders, setUserReminders] = useState([]);
  const [pendingReminders, setPendingReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [manualTriggerSuccess, setManualTriggerSuccess] = useState(false);

  useEffect(() => {
    let isMounted = true; // Prevent state update after unmount

    if (username) {
      setLoading(true);
      setError(null);

      Promise.all([fetchUserReminders(), fetchPendingReminders()])
        .catch((err) => {
          if (isMounted) setError("Error fetching reminders. Please try again.");
          console.error("Error fetching reminders:", err);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }

    return () => {
      isMounted = false; // Cleanup function to prevent memory leaks
    };
  }, [username]);

  // Fetch all reminders for the logged-in user
  const fetchUserReminders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/reminders/${username}`);
      setUserReminders(response.data);
    } catch (error) {
      setError("Failed to load user reminders.");
      console.error("Error fetching user reminders:", error);
    }
  };

  // Fetch pending reminders
  const fetchPendingReminders = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/reminders/pending/${username}`);
      setPendingReminders(response.data);
    } catch (error) {
      setError("Failed to load pending reminders.");
      console.error("Error fetching pending reminders:", error);
    }
  };

  // Mark a reminder as sent
  const markAsSent = async (reminderId) => {
    try {
      await axios.patch(`http://localhost:8080/habit/reminders/mark-sent/${reminderId}`);
      setPendingReminders((prev) => prev.filter((r) => r.id !== reminderId));
    } catch (error) {
      setError("Failed to mark reminder as sent.");
      console.error("Error marking reminder as sent:", error);
    }
  };

  // Manually trigger reminders
  const triggerRemindersManually = async () => {
    try {
      await axios.get("http://localhost:8080/habit/reminders/manual");
      setManualTriggerSuccess(true);
      setTimeout(() => setManualTriggerSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (error) {
      setError("Error triggering reminders manually.");
      console.error("Error triggering reminders:", error);
    }
  };

  // Show alert if there are pending reminders
  const handleNotificationsClick = () => {
    if (pendingReminders.length > 0) {
      alert("You have pending reminders. Please check them out!");
    } else {
      alert("No pending reminders at the moment.");
    }
  };

  return (
    <Container className="notifications-container">
      <h2 className="title text-center">🔔 Notifications & Reminders</h2>

      {/* ✅ Error Message */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* ✅ Manually Trigger Reminders */}
      <div className="text-center mb-4">
        <Button variant="primary" onClick={triggerRemindersManually}>
          🔄 Trigger Reminders Manually
        </Button>
        {manualTriggerSuccess && <Alert variant="success" className="mt-2">✅ Reminders triggered successfully!</Alert>}
      </div>

      {/* ✅ User Reminders */}
      <h4 className="section-title">📅 Your Reminders</h4>
      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : userReminders.length > 0 ? (
        <Row>
          {userReminders.map((reminder) => (
            <Col md={6} lg={4} key={reminder.id} className="mb-3">
              <Card className="reminder-card">
                <Card.Body>
                  <h5>Reminder for {reminder.activity?.name || "Unknown Activity"}</h5>
                  <p>Time: {new Date(reminder.reminderTime).toLocaleString()}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No reminders set.</p>
      )}

      {/* ✅ Pending Reminders */}
      <h4 className="section-title">⏳ Pending Reminders</h4>
      {loading ? (
        <Spinner animation="border" className="d-block mx-auto" />
      ) : pendingReminders.length > 0 ? (
        <Row>
          {pendingReminders.map((reminder) => (
            <Col md={6} lg={4} key={reminder.id} className="mb-3">
              <Card className="reminder-card pending">
                <Card.Body>
                  <h5>Reminder for {reminder.activity?.name || "Unknown Activity"}</h5>
                  <p>Time: {new Date(reminder.reminderTime).toLocaleString()}</p>
                  <Button variant="success" onClick={() => markAsSent(reminder.id)}>
                    ✅ Mark as Sent
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No pending reminders.</p>
      )}

      {/* ✅ Notifications Button */}
      <Button variant="info" onClick={handleNotificationsClick} className="mt-4">
        📬 Notifications
      </Button>
    </Container>
  );
};

export default Notifications;
