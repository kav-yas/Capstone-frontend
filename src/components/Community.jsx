import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import "../styles/Community.css"; // ✅ Import CSS file for styling

const Community = () => {
  const members = ["Alice", "Bob", "Charlie"];

  return (
    <Container className="community-container">
      <div className="community-card">
        <h2 className="community-title">Community & Friends 👥</h2>
        <ListGroup className="community-list">
          {members.map((member, index) => (
            <ListGroup.Item key={index} className="community-item">
              {member}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default Community;
