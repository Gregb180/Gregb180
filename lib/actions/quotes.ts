"use server"

import { revalidatePath } from "next/cache"
import { kv } from "@vercel/kv"
import { nanoid } from "nanoid"

// This will be used later when we add embedding functionality
// import { generateEmbedding } from "@/lib/embeddings"

// Simple in-memory storage for now (replace with your database)
// const quotes = new Map()

export async function submitQuote(formData: FormData) {
  try {
    // Extract data from formData
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const serviceDescription = formData.get("serviceDescription") as string
    const photo = formData.get("photo") as File | null

    // Generate a unique ID for the quote
    const id = nanoid()

    // Create quote object
    const quote = {
      id,
      name,
      email,
      phone,
      serviceDescription,
      hasPhoto: !!photo,
      photoUrl: photo ? `/api/quotes/${id}/photo` : null, // We'll implement this endpoint later
      createdAt: new Date().toISOString(),
      // This is where we would store the embedding vector when implemented
      // embedding: null,
      status: "pending",
      matches: [],
    }

    // Store the quote (using Vercel KV for simplicity)
    await kv.set(`quote:${id}`, JSON.stringify(quote))

    // If there's a photo, we would handle it here
    // For now, we'll just log it
    if (photo) {
      console.log(`Photo received for quote ${id}`)
      // In a real implementation, you would upload this to a storage service
      // and update the quote with the photo URL
    }

    // Future enhancement: Generate embedding for the service description
    // if (process.env.OPENAI_API_KEY) {
    //   const embedding = await generateEmbedding(serviceDescription)
    //   await kv.set(`quote:${id}:embedding`, JSON.stringify(embedding))
    // }

    // Revalidate the quotes page
    revalidatePath("/quotes")
    revalidatePath("/dashboard")

    return { success: true, id }
  } catch (error) {
    console.error("Error submitting quote:", error)
    return { success: false, error: "Failed to submit quote" }
  }
}

export async function getQuotes() {
  // This is a simplified implementation
  // In a real app, you would query your database
  const keys = await kv.keys("quote:*")
  const quotes = []

  for (const key of keys) {
    if (!key.includes(":embedding")) {
      const quote = await kv.get(key)
      if (quote) quotes.push(JSON.parse(quote as string))
    }
  }

  return quotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getQuoteById(id: string) {
  const quote = await kv.get(`quote:${id}`)
  return quote ? JSON.parse(quote as string) : null
}
