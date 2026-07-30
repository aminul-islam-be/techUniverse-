"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function login() {
    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin");
    } else {
      alert("Invalid Username or Password");
    }
  }

  return (
    <main
      style={{
        maxWidth: "400px",
        margin: "60px auto",
        padding: "20px",
      }}
    >
      <h1>Admin Login</h1>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={login}
        style={{
          width: "100%",
          padding: "12px",
        }}
      >
        Login
      </button>
    </main>
  );
      }
