import { getQuotes } from "@/lib/actions/quotes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

export const metadata = {
  title: "Quote Dashboard",
  description: "View and manage quote requests",
}

export default async function DashboardPage() {
  const quotes = await getQuotes()

  return (
    <div className="container py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Quote Requests</h1>
          <p className="text-muted-foreground">View and manage incoming quote requests from clients.</p>
        </div>

        {quotes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No quote requests yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote: any) => (
              <Card key={quote.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{quote.name}</CardTitle>
                  <CardDescription>
                    Submitted {formatDistanceToNow(new Date(quote.createdAt), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Email:</span> {quote.email}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Phone:</span> {quote.phone}
                    </div>
                    <div className="text-sm mt-4">
                      <span className="font-medium">Service Needed:</span>
                      <p className="mt-1 text-muted-foreground">{quote.serviceDescription}</p>
                    </div>
                    {quote.hasPhoto && (
                      <div className="mt-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Has Photo</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
