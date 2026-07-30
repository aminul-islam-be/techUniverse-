"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product") || "";
  const amount = searchParams.get("amount") || "0";

  const [method, setMethod] = useState("bkash");
  const [trxId, setTrxId] = useState("");

  const paymentNumbers = {
    bkash: "01922964696",
    nagad: "01922964696",
    rocket: "01922964696",
  };

  function submitPayment() {
    if (!trxId.trim()) {
      alert("Please enter your Transaction ID (TrxID).");
      return;
    }

    alert("Payment submitted successfully! Your order is now Pending Approval.");
  }

  return (
    <main className="wrap" style={{ padding: "30px" }}>
      <h1>Checkout</h1>

      <h2>{product}</h2>

      <h3>Amount: ৳{amount}</h3>

      <hr />

      <h3>Select Payment Method</h3>

      <label>
        <input
          type="radio"
          value="bkash"
          checked={method === "bkash"}
          onChange={(e) => setMethod(e.target.value)}
        />
        bKash
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="nagad"
          checked={method === "nagad"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Nagad
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="rocket"
          checked={method === "rocket"}
          onChange={(e) => setMethod(e.target.value)}
        />
        Rocket
      </label>

      <hr />

      <h3>Send Money To</h3>

      <h2>{paymentNumbers[method]}</h2>

      <input
        type="text"
        placeholder="Enter Transaction ID"
        value={trxId}
        onChange={(e) => setTrxId(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "15px",
        }}
      />

      <button
        onClick={submitPayment}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
        }}
      >
        Submit Payment
      </button>
    </main>
  );
          }
