import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

export default function Chat() {
  const [users] = useState([
    { id: 1, name: "John" },
    { id: 2, name: "Kelvin" },
    { id: 3, name: "Rachel" },
    { id: 4, name: "Precious" },
  ]);
  const [currentUser, setCurrentUser] = useState(users[0]);

  const [messages, setMessages] = useState({
    1: [{ id: 1, text: "Hey John!", sender: "me", seen: true }],
    2: [{ id: 1, text: "Hi Kelvin 👋", sender: "me", seen: false }],
    3: [{ id: 1, text: "Kelvin, did you finish the project?", sender: "me", seen: false }],
    4: [{ id: 1, text: "Hey Precious how are you doing!", sender: "me", seen: false }],
  });

  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const getInitials = (name) => 
    name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages[currentUser.id].length + 1,
      text: newMessage,
      sender: "me",
      seen: true,
    };

    setMessages((prev) => ({
      ...prev,
      [currentUser.id]: [...prev[currentUser.id], newMsg],
    }));

    setNewMessage("");
  };

  // Handle emoji select
  const onEmojiClick = (emojiData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newMsg = {
        id: messages[currentUser.id].length + 1,
        text: `📎 Sent file: ${file.name}`,
        sender: "me",
        seen: true,
      };
      setMessages((prev) => ({
        ...prev,
        [currentUser.id]: [...prev[currentUser.id], newMsg],
      }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>ChatApp</h2>
        <div style={styles.chatList}>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setCurrentUser(user)}
              style={{
                ...styles.chatItem,
                background:
                  currentUser.id === user.id ? "#e0e0e0" : "transparent",
              }}
            >
              <div style={styles.avatar}>{getInitials(user.name)}</div>
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div style={styles.chatSection}>
        {/* Header */}
        <div style={styles.chatHeader}>
          <div style={styles.avatar}>{getInitials(currentUser.name)}</div>
          <h3>{currentUser.name}</h3>
        </div>

        {/* Messages */}
        <div style={styles.chatBody}>
          {messages[currentUser.id].map((msg) => (
            <div
              key={msg.id}
              style={{
                ...styles.message,
                ...(msg.sender === "me"
                  ? styles.myMessage
                  : styles.otherMessage),
              }}
            >
              {msg.text}
              {msg.sender === "me" && (
                <div style={styles.ticks}>
                  <span style={{ color: msg.seen ? "#34B7F1" : "#555" }}>
                    ✅✅
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Section */}
        <form style={styles.chatInput} onSubmit={handleSend}>
          {/* File Upload */}
          <label style={styles.fileIcon}>
            📎
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
          </label>

          {/* Message Input */}
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={styles.input}
            />
            <span
              style={styles.emojiIcon}
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              🙂
            </span>
          </div>

          {/* Emoji Picker Popup */}
          {showEmojiPicker && (
            <div style={styles.emojiPicker}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Send Button */}
          <button type="submit" style={styles.sendBtn}>
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "250px",
    background: "#f8f9fa",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    padding: "20px",
    margin: 0,
    fontSize: "1.4rem",
    fontWeight: "bold",
    borderBottom: "1px solid #ddd",
  },
  chatList: {
    flex: 1,
    overflowY: "auto",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    cursor: "pointer",
    gap: "10px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#2575fc",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1rem",
  },
  chatSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    padding: "15px",
    borderBottom: "1px solid #ddd",
    background: "#fff",
    gap: "10px",
  },
  chatBody: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    background: "#f1f3f6",
  },
  message: {
    maxWidth: "60%",
    padding: "10px 35px 15px 15px",
    borderRadius: "20px",
    marginBottom: "10px",
    fontSize: "0.95rem",
    position: "relative",
  },
  myMessage: {
    background: "#dcf8c6",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  otherMessage: {
    background: "#fff",
    alignSelf: "flex-start",
    border: "1px solid #ddd",
  },
  ticks: {
    fontSize: "0.8rem",
    position: "absolute",
    bottom: "5px",
    right: "10px",
  },
  chatInput: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderTop: "1px solid #ddd",
    background: "#fff",
    position: "relative",
  },
  fileIcon: {
    fontSize: "1.5rem",
    marginRight: "10px",
    cursor: "pointer",
  },
  inputWrapper: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  input: {
    flex: 1,
    padding: "10px 40px 10px 15px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
  },
  emojiIcon: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
  emojiPicker: {
    position: "absolute",
    bottom: "60px",
    right: "80px",
    zIndex: 1000,
  },
  sendBtn: {
    marginLeft: "10px",
    padding: "10px 20px",
    border: "none",
    borderRadius: "20px",
    background: "#075e54",
    color: "white",
    cursor: "pointer",
  },
};
