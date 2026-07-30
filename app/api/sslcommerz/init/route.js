import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      amount,
      productName,
      customerName,
      customerEmail,
      customerPhone,
    } = body;

    const transactionId =
      "TXN_" +
      Date.now() +
      "_" +
      Math.random().toString(36).substring(2, 8);

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const payload = {
      store_id: process.env.SSLCZ_STORE_ID,
      store_passwd: process.env.SSLCZ_STORE_PASSWORD,

      total_amount: amount,
      currency: "BDT",

      tran_id: transactionId,

      success_url: `${baseUrl}/api/sslcommerz/success`,
      fail_url: `${baseUrl}/api/sslcommerz/fail`,
      cancel_url: `${baseUrl}/api/sslcommerz/cancel`,
      ipn_url: `${baseUrl}/api/sslcommerz/ipn`,

      product_name: productName,
      product_category: "Electronics",
      product_profile: "general",

      cus_name: customerName,
      cus_email: customerEmail,
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_phone: customerPhone,

      shipping_method: "NO",
    };

    const isLive = process.env.SSLCZ_IS_LIVE === "true";

    const sslUrl = isLive
      ? "https://securepay.sslcommerz.com/gwprocess/v4/api.php"
      : "https://sandbox.sslcommerz.com/gwprocess/v4/api.php";

    const response = await fetch(sslUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(payload),
    });

    const data = await response.json();

    if (data?.status === "SUCCESS") {
      return NextResponse.json({
        success: true,
        gatewayURL: data.GatewayPageURL,
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Unable to initialize payment.",
        data,
      },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
