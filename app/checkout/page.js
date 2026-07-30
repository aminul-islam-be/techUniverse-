"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product") || "Product";
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
      alert("Please enter your Transaction ID (TrxID)");
      return;
    }

    const order = {
      id: Date.now(),
      product,
      amount,
      paymentMethod: method,
      trxId,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    const oldOrders = JSON.parse(localStorage.getItem("orders") || "[]");

    oldOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(oldOrders));

    alert("Order Submitted Successfully!");

    window.location.href = "/thank-you";
  }

  return (
    <main
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Checkout</h1>

      <hr />

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

      <p>
        Send the full payment to the selected number, then enter your
        Transaction ID below.
      </p>

      <input
        type="text"
        placeholder="Enter Transaction ID (TrxID)"
        value={trxId}
        onChange={(e) => setTrxId(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          fontSize: "16px",
          marginTop: "10px",
        }}
      />

      <button
        onClick={submitPayment}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "14px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Submit Payment
      </button>
    </main>
  );
            }
