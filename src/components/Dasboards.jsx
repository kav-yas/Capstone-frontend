import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link for navigation
import { FaBullseye, FaTasks, FaBell, FaPlus, FaSun, FaMoon } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboards = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true"; // Preserve theme on reload
  });

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} style={{ minHeight: "100vh", padding: "20px" }}>
      <Container fluid>
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h2>Welcome to Habit-Sync Dashboard 🎯</h2>
            <div>
              <Link to="/add-habit">
                <Button variant="outline-primary" className="me-2">
                  <FaPlus /> Add Habit
                </Button>
              </Link>
              <Button variant="outline-secondary" onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <FaSun /> : <FaMoon />}
              </Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Card className={`mb-3 p-3 shadow ${darkMode ? "bg-dark text-light" : ""}`}>
              <Card.Body>
                <h4><FaBullseye /> Habit Streak 🔥</h4>
                <p>Current Streak: <strong>0 Days</strong></p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`mb-3 p-3 shadow ${darkMode ? "bg-dark text-light" : ""}`}>
              <Card.Body>
                <h4><FaTasks /> Today's Tasks ✅</h4>
                <p>0 Habits Completed</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`mb-3 p-3 shadow ${darkMode ? "bg-dark text-light" : ""}`}>
              <Card.Body>
                <h4><FaBell /> Upcoming Reminders ⏰</h4>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboards;
