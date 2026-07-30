"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();

  const product = searchParams.get("product") || "Product";
  const amount = searchParams.get("amount") || "0";

  const [method, setMethod] = useState("bkash");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [trxId, setTrxId] = useState("");

  const [paymentNumbers, setPaymentNumbers] = useState({
    bkash: "",
    nagad: "",
    rocket: "",
  });

  useEffect(() => {
    const settings = JSON.parse(
      localStorage.getItem("paymentSettings") || "{}"
    );

    setPaymentNumbers({
      bkash: settings.bkash || "01922964696",
      nagad: settings.nagad || "01922964696",
      rocket: settings.rocket || "01922964696",
    });
  }, []);

  function submitPayment() {
    if (!name || !phone || !address || !trxId) {
      alert("Please fill all required fields.");
      return;
    }

    const order = {
      id: Date.now(),
      product,
      amount,
      customerName: name,
      phone,
      email,
      address,
      paymentMethod: method,
      paymentNumber: paymentNumbers[method],
      trxId,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order Submitted Successfully!");

    window.location.href = "/thank-you";
  }

  return (
    <main style={{ maxWidth: 650, margin: "40px auto", padding: 20 }}>
      <h1>Checkout</h1>

      <h2>{product}</h2>
      <h3>Amount: ৳{amount}</h3>

      <hr />

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Email (Optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Full Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <hr />

      <h3>Select Payment Method</h3>

      <label>
        <input
          type="radio"
          checked={method === "bkash"}
          onChange={() => setMethod("bkash")}
        />
        bKash
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={method === "nagad"}
          onChange={() => setMethod("nagad")}
        />
        Nagad
      </label>

      <br />

      <label>
        <input
          type="radio"
          checked={method === "rocket"}
          onChange={() => setMethod("rocket")}
        />
        Rocket
      </label>

      <hr />

      <h3>Send Money To</h3>

      <h2>{paymentNumbers[method]}</h2>

      <input
        placeholder="Transaction ID (TrxID)"
        value={trxId}
        onChange={(e) => setTrxId(e.target.value)}
      />

      <br /><br />

      <button onClick={submitPayment}>
        Submit Payment
      </button>
    </main>
  );
          }
