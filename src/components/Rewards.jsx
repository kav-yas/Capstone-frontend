import React from "react";
import { Container, Card } from "react-bootstrap";
import "../styles/Rewards.css"; // Import the CSS file

const Rewards = () => {
  return (
    <Container className="rewards-container">
      <Card className="rewards-card">
        <Card.Body>
          <h2>Rewards & Achievements 🏆</h2>
          <h5>🏅 7-Day Streak Achieved!</h5>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Rewards;
