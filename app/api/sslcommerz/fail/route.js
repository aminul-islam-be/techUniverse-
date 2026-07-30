import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("SSLCommerz Payment Failed:", body);

    return NextResponse.json({
      success: false,
      message: "Payment Failed",
      data: body,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.redirect(
    new URL("/payment-failed", process.env.NEXT_PUBLIC_BASE_URL)
  );
}
