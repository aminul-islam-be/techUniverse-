"use client";

import { useRouter } from "next/navigation";

export default function BuyNowButton({
  amount,
  productName,
}) {
  const router = useRouter();

  const handleBuyNow = () => {
    const params = new URLSearchParams({
      amount: amount.toString(),
      product: productName,
    });

    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <button
      onClick={handleBuyNow}
      className="buy-btn"
    >
      Buy Now
    </button>
  );
}
