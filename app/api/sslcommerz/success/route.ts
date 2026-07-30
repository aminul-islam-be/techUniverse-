import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("SSLCommerz Success:", body);

    // পরে এখানে Order Save, Payment Verify, Invoice তৈরি হবে

    return NextResponse.json({
      success: true,
      message: "Payment Successful",
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
    new URL("/thank-you", process.env.NEXT_PUBLIC_BASE_URL)
  );
}
