import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Subscriber from "@/models/Subscriber";

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Check if user already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "You are already subscribed!" },
        { status: 400 },
      );
    }

    const newSubscriber = await Subscriber.create({ email });

    return NextResponse.json(
      { message: "Subscribed successfully!", data: newSubscriber },
      { status: 201 },
    );
  } catch (error) {
    console.error("Newsletter Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
