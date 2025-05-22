"use server"

import { revalidatePath } from "next/cache"
import { nanoid } from "nanoid"

// Simple in-memory storage (this will reset on server restart)
// In production, you would use a database
const quotesStore: Record<string, any> = {}

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
      photoUrl: photo ? `/api/quotes/${id}/photo` : null,
      createdAt: new Date().toISOString(),
      status: "pending",
      matches: [],
    }

    // Store the quote in memory
    quotesStore[id] = quote

    // If there's a photo, we would handle it here
    // For now, we'll just log it
    if (photo) {
      console.log(`Photo received for quote ${id}`)
      // In a real implementation, you would upload this to a storage service
    }

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
  // Return quotes from in-memory store
  return Object.values(quotesStore).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getQuoteById(id: string) {
  return quotesStore[id] || null
}
