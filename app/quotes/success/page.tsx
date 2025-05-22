import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Quote Submitted",
  description: "Your quote request has been submitted successfully",
}

export default function QuoteSuccessPage() {
  return (
    <div className="container max-w-md py-20">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold">Quote Request Submitted!</h1>
        <p className="text-muted-foreground">
          Thank you for your submission. Businesses that match your needs will contact you soon with quotes.
        </p>
        <div className="pt-4">
          <Button asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
