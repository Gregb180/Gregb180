import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { apiKey, formData } = body

  if (apiKey !== process.env.QUOTING_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Simulate saving the quote
  // In real use: save to Supabase, Firebase, or your database of choice
  console.log("Quote submitted:", formData)

  return NextResponse.json({ success: true, message: "Quote submitted successfully" })
}
