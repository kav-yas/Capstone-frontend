import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
import "../styles/TrackProgress.css";

const TrackProgress = () => {
  const username = localStorage.getItem("username");
  const [streak, setStreak] = useState(0);
  const [todayHabits, setTodayHabits] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [username]);

  const fetchData = async () => {
    await Promise.all([fetchStreak(), fetchHistory(), fetchTodayHabits(7)]);
  };

  const fetchStreak = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/streak/${username}`);
      setStreak(response.data);
    } catch (error) {
      console.error("Error fetching streak:", error);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/history/${username}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching habit history:", error);
    }
  };

  const fetchTodayHabits = async (days) => {
    try {
      const response = await axios.get(`http://localhost:8080/habit/today/${username}/${days}`);
      setTodayHabits(response.data);
    } catch (error) {
      console.error("Error fetching today's habits:", error);
    }
  };

  const completeHabit = async (activityId) => {
    try {
      await axios.post(`http://localhost:8080/habit/complete/${username}/${activityId}`);
      fetchData(); // Refresh data after completing habit
    } catch (error) {
      console.error("Error completing habit:", error);
    }
  };

  return (
    <Container className="track-progress-container">
      <div className="track-progress-card">
        <h2 className="progress-title">Track Your Progress 📊</h2>

        {/* Streak Card */}
        <Card className="streak-card mb-4">
          <Card.Body>
            <h4 className="streak-text">🔥 Streak: {streak} days</h4>
          </Card.Body>
        </Card>

      </div>
    </Container>
  );
};

export default TrackProgress;
