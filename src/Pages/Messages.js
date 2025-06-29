import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "../Styles/Messages.css";
import {
  FaComments,
  FaEnvelope,
  FaPaperPlane,
  FaTrash,
  FaInbox,
} from "react-icons/fa";

const Messages = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [error, setError] = useState(null);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  // Load messages from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMessage((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    if (
      !newMessage.name ||
      !newMessage.email ||
      !newMessage.subject ||
      !newMessage.message
    ) {
      setError("Please fill in all fields");
      return;
    }

    setSending(true);
    setError(null);

    try {
      // Check if EmailJS is configured
      if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
        // Fallback to simulation if EmailJS is not configured
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.warn("EmailJS not configured. Using simulation mode.");
      } else {
        // Send email using EmailJS
        const templateParams = {
          from_name: newMessage.name,
          from_email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
          to_name: "Rajesh Paudel",
          current_date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          current_time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY
        );
      }

      const messageToSave = {
        id: Date.now(),
        ...newMessage,
        timestamp: new Date().toISOString(),
        status: "sent",
      };

      setMessages((prev) => [messageToSave, ...prev]);
      setNewMessage({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSentSuccess(true);

      setTimeout(() => setSentSuccess(false), 3000);
    } catch (err) {
      console.error("Email sending error:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={`messages-app ${darkMode ? "dark-mode" : ""}`}>
      <div className="messages-header">
        <div className="messages-title">
          <div className="messages-icon">
            <FaComments size={24} />
          </div>
          <h1>Messages</h1>
        </div>
        <div className="messages-stats">
          <span className="stat-item">
            <span className="stat-number">{messages.length}</span>
            <span className="stat-label">Total</span>
          </span>
          <span className="stat-item">
            <span className="stat-number">
              {messages.filter((m) => m.status === "sent").length}
            </span>
            <span className="stat-label">Sent</span>
          </span>
        </div>
      </div>

      <div className="messages-content">
        <div className="messages-sidebar">
          <div className="compose-section">
            <h3>New Message</h3>
            {!EMAILJS_SERVICE_ID && (
              <div className="emailjs-notice">
                <p>
                  <FaEnvelope size={16} /> EmailJS not configured. Messages will
                  be simulated.
                </p>
                <p>
                  To enable real email sending, add your EmailJS credentials to
                  environment variables.
                </p>
              </div>
            )}
            <form onSubmit={sendMessage} className="compose-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newMessage.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newMessage.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={newMessage.subject}
                  onChange={handleInputChange}
                  placeholder="Message subject"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={newMessage.message}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                  rows="6"
                  required
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              {sentSuccess && (
                <div className="success-message">
                  Message sent successfully! <FaEnvelope size={16} />
                </div>
              )}

              <button type="submit" className="send-button" disabled={sending}>
                {sending ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <span className="send-icon">
                      <FaPaperPlane size={16} />
                    </span>
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="messages-main">
          <div className="messages-list">
            <h3>Message History</h3>
            {messages.length > 0 ? (
              <div className="messages-container">
                {messages.map((message) => (
                  <div key={message.id} className="message-item">
                    <div className="message-header">
                      <div className="message-info">
                        <div className="message-sender">{message.name}</div>
                        <div className="message-subject">{message.subject}</div>
                        <div className="message-date">
                          {formatDate(message.timestamp)}
                        </div>
                      </div>
                      <div className="message-actions">
                        <span className="message-status sent">✓ Sent</span>
                        <button
                          className="delete-message-btn"
                          onClick={() => deleteMessage(message.id)}
                          title="Delete message"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="message-preview">
                      <div className="message-email">From: {message.email}</div>
                      <div className="message-content">
                        {message.message.substring(0, 100)}
                        {message.message.length > 100 ? "..." : ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-messages">
                <div className="empty-icon">
                  <FaInbox size={48} />
                </div>
                <h3>No messages yet</h3>
                <p>Send your first message using the form on the left.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="messages-footer">
        <p>Messages are stored locally and sent via EmailJS integration</p>
        <div className="contact-info">
          <span>
            <FaEnvelope size={16} /> rajesh.paudel@example.com
          </span>
          <span>📱 +1 (555) 123-4567</span>
        </div>
      </div>
    </div>
  );
};

export default Messages;
