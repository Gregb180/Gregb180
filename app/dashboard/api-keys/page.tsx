"use client"

import { useState } from "react"
import { Copy, Key, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ApiKeysPage() {
  const [apiKey, setApiKey] = useState("qg_live_5f7c8a9b3d2e1f0a4b5c6d7e")
  const [testApiKey, setTestApiKey] = useState("qg_test_3e2d1f0a4b5c6d7e8f9g0h1i")
  const [showAlert, setShowAlert] = useState(false)

  const generateNewKey = (isTest: boolean) => {
    // In a real app, this would call an API to generate a new key
    const prefix = isTest ? "qg_test_" : "qg_live_"
    const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const newKey = prefix + randomString

    if (isTest) {
      setTestApiKey(newKey)
    } else {
      setApiKey(newKey)
    }

    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 5000)
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    alert("API key copied to clipboard")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API Keys</h1>
      </div>

      {showAlert && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <Key className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">New API Key Generated</AlertTitle>
          <AlertDescription className="text-yellow-700">
            Your new API key has been generated. Make sure to copy it now as you won't be able to see it again.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="live">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="live">Live Keys</TabsTrigger>
          <TabsTrigger value="test">Test Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Live API Key</CardTitle>
              <CardDescription>
                Use this key for production environments. This key has access to live data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="live-api-key">API Key</Label>
                <div className="flex">
                  <Input id="live-api-key" value={apiKey} readOnly className="font-mono rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard(apiKey)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => generateNewKey(false)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Usage Example</CardTitle>
              <CardDescription>Example of how to use the API key to submit quotes.</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-slate-100 p-4 rounded-md overflow-x-auto text-sm">
                {`// Example API request
fetch('/api/quotes', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    apiKey: '${apiKey}',
    formData: {
      clientName: 'Acme Inc',
      services: ['Web Development', 'UI/UX Design'],
      budget: 15000,
      timeline: '3 months'
    }
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="test" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Test API Key</CardTitle>
              <CardDescription>
                Use this key for development and testing. This key only has access to test data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-api-key">API Key</Label>
                <div className="flex">
                  <Input id="test-api-key" value={testApiKey} readOnly className="font-mono rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none" onClick={() => copyToClipboard(testApiKey)}>
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copy</span>
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => generateNewKey(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Test Environment</CardTitle>
              <CardDescription>Information about the test environment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Test Environment Details</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>All API calls with test keys are logged but do not affect production data</li>
                  <li>Test keys have the same rate limits as live keys</li>
                  <li>Test environment is refreshed every 24 hours</li>
                  <li>Test quotes are automatically marked with "TEST" in the dashboard</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
