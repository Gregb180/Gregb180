import { QuoteForm } from "@/components/quote-form"

export const metadata = {
  title: "Request a Quote",
  description: "Submit your service request and get quotes from businesses",
}

export default function QuotePage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Request a Quote</h1>
          <p className="text-muted-foreground">
            Fill out the form below to request quotes from businesses that match your needs.
          </p>
        </div>
        <QuoteForm />
      </div>
    </div>
  )
}
