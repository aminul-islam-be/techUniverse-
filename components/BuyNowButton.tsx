"use client";

type BuyNowButtonProps = {
  amount: number;
  productName: string;
};

export default function BuyNowButton({
  amount,
  productName,
}: BuyNowButtonProps) {
  const handleBuyNow = async () => {
    try {
      const response = await fetch("/api/sslcommerz/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          productName,
          customerName: "Test Customer",
          customerEmail: "test@example.com",
          customerPhone: "01700000000",
        }),
      });

      const data = await response.json();

      if (data.success && data.gatewayURL) {
        window.location.href = data.gatewayURL;
      } else {
        alert(data.message || "Payment initialization failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <button
      onClick={handleBuyNow}
      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
    >
      Buy Now
    </button>
  );
}
