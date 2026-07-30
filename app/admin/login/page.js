"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");

    if (loggedIn !== "true") {
      router.replace("/admin/login");
      return;
    }

    const savedOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    setOrders(savedOrders);
    setLoading(false);
  }, [router]);

  function updateStatus(id, status) {
    const updated = orders.map((order) =>
      order.id === id
        ? { ...order, status }
        : order
    );

    setOrders(updated);

    localStorage.setItem(
      "orders",
      JSON.stringify(updated)
    );
  }

  function logout() {
    localStorage.removeItem("adminLoggedIn");
    router.replace("/admin/login");
  }

  if (loading) {
    return <h2 style={{ padding: 20 }}>Loading...</h2>;
  }

  return (
    <main
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Admin Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <br />

      {orders.length === 0 ? (
        <h3>No Orders Found</h3>
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
              <th>Customer</th>
              <th>Phone</th>
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
                <td>{order.customerName}</td>
                <td>{order.phone}</td>
                <td>৳{order.amount}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.trxId}</td>
                <td>{order.status}</td>

                <td>
                  <button
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Approved"
                      )
                    }
                  >
                    Approve
                  </button>

                  <button
                    style={{ marginLeft: 8 }}
                    onClick={() =>
                      updateStatus(
                        order.id,
                        "Rejected"
                      )
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
