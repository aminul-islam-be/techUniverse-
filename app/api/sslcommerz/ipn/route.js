import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    console.log("SSLCommerz IPN:", body);

    return NextResponse.json({
      success: true,
      message: "IPN Received",
      data: body,
    });
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

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "SSLCommerz IPN Endpoint is working.",
  });
}
