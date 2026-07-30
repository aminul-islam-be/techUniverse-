"use client";

import { useEffect, useState } from "react";

export default function AdminSettings() {
  const [bkash, setBkash] = useState("");
  const [nagad, setNagad] = useState("");
  const [rocket, setRocket] = useState("");

  useEffect(() => {
    const settings = JSON.parse(
      localStorage.getItem("paymentSettings") || "{}"
    );

    setBkash(settings.bkash || "");
    setNagad(settings.nagad || "");
    setRocket(settings.rocket || "");
  }, []);

  function saveSettings() {
    localStorage.setItem(
      "paymentSettings",
      JSON.stringify({
        bkash,
        nagad,
        rocket,
      })
    );

    alert("Payment numbers saved successfully.");
  }

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Payment Settings</h1>

      <br />

      <label>01922964696</label>

      <input
        value={bkash}
        onChange={(e) => setBkash(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      />

      <label>01922964696</label>

      <input
        value={nagad}
        onChange={(e) => setNagad(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      />

      <label>01922964696</label>

      <input
        value={rocket}
        onChange={(e) => setRocket(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      />

      <button
        onClick={saveSettings}
        style={{
          width: "100%",
          padding: "14px",
        }}
      >
        Save Settings
      </button>
    </main>
  );
      }
