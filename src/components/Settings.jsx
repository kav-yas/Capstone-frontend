import React from "react";
import { Container, Form, Card } from "react-bootstrap";
import "../styles/Settings.css"; // Import the new CSS

const Settings = () => {
  return (
    <Container className="settings-container">
      <Card className="settings-card">
        <h2 className="settings-title">Settings ⚙️</h2>
        <Form className="settings-form">
          <Form.Check type="switch" label="Enable Dark Mode" className="form-switch" />
          <Form.Check type="switch" label="Receive Notifications" className="form-switch" />
        </Form>
      </Card>
    </Container>
  );
};

export default Settings;
