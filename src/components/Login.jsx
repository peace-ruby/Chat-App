import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("⚠️ Please enter both email and password");
      return;
    }
    navigate("/chat"); // redirect to Chat page
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            LOGIN
          </button>
          <p style={{ marginTop: "1rem" }}>
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              style={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

// ✅ Styles
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage:
      "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  formWrapper: {
    background: "rgba(255,255,255,0.15)",
    padding: "2rem",
    borderRadius: "12px",
    width: "350px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
    color: "white",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "1.5rem",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "6px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "1rem",
    background: "linear-gradient(90deg, #6a11cb, #2575fc)",
    border: "none",
    borderRadius: "6px",
    color: "white",
    fontWeight: "bold",
    fontSize: "1rem",
    cursor: "pointer",
  },
};
