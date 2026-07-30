export default function ThankYouPage() {
  return (
    <main
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>🎉 Thank You!</h1>

      <h2>Your Order Has Been Submitted</h2>

      <p>
        We have received your payment information.
      </p>

      <p>
        Your order is currently <strong>Pending Verification</strong>.
      </p>

      <p>
        Our team will verify your payment and confirm your order shortly.
      </p>

      <br />

      <a
        href="/"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          background: "#2563eb",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        Continue Shopping
      </a>
    </main>
  );
}
