import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("SSLCommerz Payment Cancelled:", body);

    // পরে এখানে Cancelled Order Log করা হবে

    return NextResponse.json({
      success: false,
      message: "Payment Cancelled",
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
    new URL("/payment-cancelled", process.env.NEXT_PUBLIC_BASE_URL)
  );
}
