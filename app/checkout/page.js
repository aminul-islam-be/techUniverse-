"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [method, setMethod] = useState("bkash");

  return (
    <main className="wrap" style={{ padding: "30px" }}>
      <h1>Checkout</h1>

      <h3>Select Payment Method</h3>

      <div style={{ display: "grid", gap: "10px", marginBottom: "20px" }}>
        <label>
          <input
            type="radio"
            value="bkash"
            checked={method === "bkash"}
            onChange={(e) => setMethod(e.target.value)}
          />
          bKash
        </label>

        <label>
          <input
            type="radio"
            value="nagad"
            checked={method === "nagad"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Nagad
        </label>

        <label>
          <input
            type="radio"
            value="rocket"
            checked={method === "rocket"}
            onChange={(e) => setMethod(e.target.value)}
          />
          Rocket
        </label>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <h3>Send Payment To</h3>

        {method === "bkash" && (
          <p>
            <strong>bKash:</strong> 01XXXXXXXXX
          </p>
        )}

        {method === "nagad" && (
          <p>
            <strong>Nagad:</strong> 01XXXXXXXXX
          </p>
        )}

        {method === "rocket" && (
          <p>
            <strong>Rocket:</strong> 01XXXXXXXXX
          </p>
        )}

        <p>
          <strong>Amount:</strong> ৳1000
        </p>

        <div style={{ marginTop: "20px" }}>
          <label>Transaction ID (TrxID)</label>

          <input
            type="text"
            placeholder="Enter TrxID"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          />
        </div>

        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            cursor: "pointer",
          }}
        >
          Submit Payment
        </button>
      </div>
    </main>
  );
              }
