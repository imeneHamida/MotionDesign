import React, { useState } from 'react';
import { Card, Typography, Button, Input, Grid, theme, message } from 'antd';
import { motion } from "framer-motion";
import './Contacts.css';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { useToken } = theme;
const { useBreakpoint } = Grid;

const Contacts = () => {
  const { token } = useToken();
  const screens = useBreakpoint();

  // User input state
  const [userNumber, setUserNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  // Form submission handler
  const handleSubmit = async () => {
    if (!userEmail || !userNumber || !projectDescription) {
      message.error("Please fill in all fields.");
      return;
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      message.error("Please enter a valid email address.");
      return;
    }

    try {
      // Web3Forms API data preparation
      const formData = {
        access_key: "b78133bb-63f6-4b22-8faf-7a6f8f60ae95", // Replace with your Web3Forms access key
        email: userEmail,
        message: `Phone Number: ${userNumber}\n\nProject Description: ${projectDescription}`,
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        message.success("Your message has been sent successfully!");
        setUserEmail('');
        setUserNumber('');
        setProjectDescription('');
      } else {
        message.error("Failed to send your message. Please try again.");
      }
    } catch (error) {
      message.error("An error occurred. Please try again later.");
    }
  };

  // Phone number validation handler
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const phoneRegex = /^\+?\d*$/;
    if (phoneRegex.test(value)) {
      setUserNumber(value);
    } else {
      message.warning("Please enter a valid phone number.");
    }
  };

  return (
    <div className="Contacts">
      <div className="content-wrapper">
        <div className="text-section">
          <Title level={3} style={{ color: 'white', fontSize: '1.75rem' }}>Let's discuss Your project</Title>
          <Text style={{ color: 'white', fontSize: '1.25rem' }}>
            We would love to discuss your project and help bring it to life.
          </Text>
        </div>
        <Card className="contact-card">
          <div style={{ display: 'flex', flexDirection: 'row', gap: token.padding }}>
            {/* Email and Phone Number Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div>
                <Text type="secondary">Your Email</Text><br />
                <Input
                  type="email"
                  placeholder="your-email@example.com"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{ marginBottom: token.marginMD }}
                />
                <Text type="secondary">Your Phone Number</Text><br />
                <Input
                  type="tel"
                  placeholder="0XXX XX XX XX"
                  value={userNumber}
                  onChange={handlePhoneNumberChange}
                  style={{ marginBottom: token.marginMD }}
                />
              </div>
            </div>
            {/* Project Description Section */}
            <div style={{ flex: 1 }}>
              <Text type="secondary">About your project</Text>
              <TextArea
                className="contact-textarea"
                placeholder="Describe your project here"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                rows={4}
                style={{ 
                  marginBottom: token.marginMD,
                  resize: 'none',
                  minHeight: "105px",
                  overflowY: "auto",
                }}
              />

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Button type="primary" onClick={handleSubmit}>
                  <b>Discuss the project</b>
                </Button>
              </motion.div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contacts;
