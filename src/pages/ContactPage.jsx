import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function ContactPage() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setValidated(false);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Contact submitted successfully!");
        handleReset();
      } else {
        alert("Submit failed!");
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      alert("Something went wrong!");
    }

    setValidated(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-form-wrapper">
        <h2 className="mb-4">Contact Us</h2>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter your message.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="me-2">
            Submit
          </Button>
          <Button variant="secondary" type="button" onClick={handleReset}>
            Reset
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ContactPage;
