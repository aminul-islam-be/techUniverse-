"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(data);
  }, []);

  function updateStatus(id, status) {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  return (
    <main
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Admin Order Panel</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>TrxID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.product}</td>
                <td>৳{order.amount}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.trxId}</td>
                <td>{order.status}</td>

                <td>
                  <button
                    onClick={() =>
                      updateStatus(order.id, "Approved")
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() =>
                      updateStatus(order.id, "Rejected")
                    }
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
