"use client"

import { BarChart, LineChart } from "lucide-react"
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react"
import { Eye, MessageSquare, Calendar, Download, Filter, Search } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

// Mock data for analytics
const signupData = [
  { name: "Week 1", value: 12 },
  { name: "Week 2", value: 19 },
  { name: "Week 3", value: 15 },
  { name: "Week 4", value: 27 },
]

const quotesData = [
  { name: "Week 1", value: 145 },
  { name: "Week 2", value: 178 },
  { name: "Week 3", value: 192 },
  { name: "Week 4", value: 236 },
]

const serviceTypesData = [
  { name: "Web Development", value: 35 },
  { name: "Mobile Apps", value: 25 },
  { name: "UI/UX Design", value: 20 },
  { name: "Cloud Services", value: 15 },
  { name: "IT Consulting", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

const topBusinesses = [
  { id: 1, name: "Acme Inc", quotesGenerated: 145, totalValue: "$125,750" },
  { id: 2, name: "Quantum Software Inc", quotesGenerated: 132, totalValue: "$84,600" },
  { id: 3, name: "Innovate Design Studio", quotesGenerated: 56, totalValue: "$23,500" },
  { id: 4, name: "TechSolutions Ltd", quotesGenerated: 42, totalValue: "$16,700" },
  { id: 5, name: "Global Enterprises", quotesGenerated: 38, totalValue: "$75,450" },
]

// Mock data for quote submissions
const quoteSubmissions = [
  {
    id: "QS-1001",
    businessName: "Acme Inc",
    contactName: "John Doe",
    contactEmail: "john.doe@acme.com",
    submittedAt: "2023-05-14 09:23:45",
    status: "New",
    services: ["Web Development", "UI/UX Design"],
    budget: "$15,000 - $25,000",
    timeline: "3-6 months",
    description:
      "We need a new website for our company that showcases our products and services. The website should be modern, responsive, and easy to navigate.",
    attachments: 2,
  },
  {
    id: "QS-1002",
    businessName: "TechSolutions Ltd",
    contactName: "Jane Smith",
    contactEmail: "jane.smith@techsolutions.com",
    submittedAt: "2023-05-13 14:45:12",
    status: "In Progress",
    services: ["Mobile App Development"],
    budget: "$30,000 - $50,000",
    timeline: "6-9 months",
    description:
      "We're looking to develop a mobile app for our customers to access our services on the go. The app should be available on both iOS and Android platforms.",
    attachments: 1,
  },
  {
    id: "QS-1003",
    businessName: "Global Enterprises",
    contactName: "Mike Johnson",
    contactEmail: "mike.johnson@globalent.com",
    submittedAt: "2023-05-12 11:32:18",
    status: "Resolved",
    services: ["Cloud Services", "IT Consulting"],
    budget: "$10,000 - $15,000",
    timeline: "1-3 months",
    description:
      "We need help migrating our infrastructure to the cloud. We're currently using on-premises servers and want to move to a more scalable solution.",
    attachments: 0,
  },
  {
    id: "QS-1004",
    businessName: "Innovate Design Studio",
    contactName: "Sarah Williams",
    contactEmail: "sarah.williams@innovatedesign.com",
    submittedAt: "2023-05-11 16:18:33",
    status: "New",
    services: ["Graphic Design", "Brand Identity"],
    budget: "$5,000 - $10,000",
    timeline: "1-2 months",
    description:
      "We need a complete brand refresh, including logo design, color palette, typography, and brand guidelines. Our current branding is outdated and doesn't reflect our company values.",
    attachments: 3,
  },
  {
    id: "QS-1005",
    businessName: "Quantum Software Inc",
    contactName: "David Brown",
    contactEmail: "david.brown@quantumsoftware.com",
    submittedAt: "2023-05-10 10:05:27",
    status: "In Progress",
    services: ["Software Development", "AI Solutions"],
    budget: "$50,000 - $75,000",
    timeline: "9-12 months",
    description:
      "We're looking to develop a custom software solution that uses AI to analyze customer data and provide insights. The solution should integrate with our existing CRM system.",
    attachments: 1,
  },
  {
    id: "QS-1006",
    businessName: "Acme Inc",
    contactName: "Robert Wilson",
    contactEmail: "robert.wilson@acme.com",
    submittedAt: "2023-05-09 13:42:51",
    status: "Resolved",
    services: ["E-commerce Development"],
    budget: "$20,000 - $30,000",
    timeline: "3-6 months",
    description:
      "We want to add an e-commerce section to our existing website. We need a solution that integrates with our inventory management system and provides a seamless checkout experience.",
    attachments: 0,
  },
  {
    id: "QS-1007",
    businessName: "TechSolutions Ltd",
    contactName: "Emily Davis",
    contactEmail: "emily.davis@techsolutions.com",
    submittedAt: "2023-05-08 15:37:09",
    status: "Closed",
    services: ["SEO", "Digital Marketing"],
    budget: "$5,000 - $10,000",
    timeline: "Ongoing",
    description:
      "We need help improving our search engine rankings and online presence. We're looking for a comprehensive digital marketing strategy that includes SEO, content marketing, and social media.",
    attachments: 1,
  },
]

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState("30days")
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false)
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState("all")
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("")

  const handleExport = () => {
    // In a real app, this would generate and download a report
    alert(`Exporting analytics data for the last ${timePeriod}`)
  }

  const handleTimePeriodChange = (value: string) => {
    setTimePeriod(value)
    // In a real app, this would refresh the data for the selected time period
    console.log(`Time period changed to ${value}`)
  }

  const handleViewSubmission = (submission: any) => {
    setSelectedSubmission(submission)
    setIsSubmissionModalOpen(true)
  }

  const handleUpdateSubmissionStatus = (status: string) => {
    // In a real app, this would call an API to update the submission status
    alert(`Submission ${selectedSubmission.id} status updated to ${status}`)
    setIsSubmissionModalOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-500">New</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-500">In Progress</Badge>
      case "Resolved":
        return <Badge className="bg-green-500">Resolved</Badge>
      case "Closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filteredSubmissions = quoteSubmissions
    .filter((submission) => {
      if (submissionStatusFilter === "all") return true
      return submission.status.toLowerCase() === submissionStatusFilter.toLowerCase()
    })
    .filter((submission) => {
      if (!submissionSearchQuery) return true
      const query = submissionSearchQuery.toLowerCase()
      return (
        submission.id.toLowerCase().includes(query) ||
        submission.businessName.toLowerCase().includes(query) ||
        submission.contactName.toLowerCase().includes(query) ||
        submission.contactEmail.toLowerCase().includes(query) ||
        submission.description.toLowerCase().includes(query)
      )
    })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue="30days" onValueChange={handleTimePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExport}>
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>New Signups</CardTitle>
              <CardDescription>Weekly new business signups</CardDescription>
            </div>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 pt-2">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Signups",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={signupData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="value" stroke="var(--color-value)" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle>Quotes Generated</CardTitle>
              <CardDescription>Weekly quotes generated</CardDescription>
            </div>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 pt-2">
            <div className="h-[300px] w-full">
              <ChartContainer
                config={{
                  value: {
                    label: "Quotes",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-full w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={quotesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Most Used Service Types</CardTitle>
            <CardDescription>Distribution of service types in quotes</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={serviceTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {serviceTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Top 5 Most Active Businesses</CardTitle>
            <CardDescription>Businesses with the most quotes generated</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-full w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Quotes Generated</TableHead>
                    <TableHead>Total Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topBusinesses.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell>{business.quotesGenerated}</TableCell>
                      <TableCell>{business.totalValue}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quote Submissions Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quote Submissions</CardTitle>
              <CardDescription>Manage and respond to quote requests from businesses</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search submissions..."
                  className="pl-8 w-[300px]"
                  value={submissionSearchQuery}
                  onChange={(e) => setSubmissionSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter Submissions</h4>
                      <p className="text-sm text-muted-foreground">Filter submissions by status</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant={submissionStatusFilter === "all" ? "default" : "outline"}
                          onClick={() => setSubmissionStatusFilter("all")}
                        >
                          All
                        </Button>
                        <Button
                          variant={submissionStatusFilter === "new" ? "default" : "outline"}
                          onClick={() => setSubmissionStatusFilter("new")}
                        >
                          New
                        </Button>
                        <Button
                          variant={submissionStatusFilter === "in progress" ? "default" : "outline"}
                          onClick={() => setSubmissionStatusFilter("in progress")}
                        >
                          In Progress
                        </Button>
                        <Button
                          variant={submissionStatusFilter === "resolved" ? "default" : "outline"}
                          onClick={() => setSubmissionStatusFilter("resolved")}
                        >
                          Resolved
                        </Button>
                        <Button
                          variant={submissionStatusFilter === "closed" ? "default" : "outline"}
                          onClick={() => setSubmissionStatusFilter("closed")}
                        >
                          Closed
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <Button variant="outline" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Date Range
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      No submissions found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">{submission.id}</TableCell>
                      <TableCell>{submission.businessName}</TableCell>
                      <TableCell>{submission.contactName}</TableCell>
                      <TableCell>{submission.submittedAt}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {submission.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="font-normal">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{submission.budget}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewSubmission(submission)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">View</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Submission Detail Modal */}
      <Dialog open={isSubmissionModalOpen} onOpenChange={setIsSubmissionModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedSubmission && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">Quote Submission {selectedSubmission.id}</DialogTitle>
                <DialogDescription>
                  Submitted by {selectedSubmission.businessName} on {selectedSubmission.submittedAt}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Business Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Business Name:</span>
                        <span className="font-medium">{selectedSubmission.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact Name:</span>
                        <span className="font-medium">{selectedSubmission.contactName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact Email:</span>
                        <span className="font-medium">{selectedSubmission.contactEmail}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Project Details</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Services:</span>
                        <div className="text-right">
                          {selectedSubmission.services.map((service: string, index: number) => (
                            <div key={index} className="font-medium">
                              {service}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{selectedSubmission.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Timeline:</span>
                        <span className="font-medium">{selectedSubmission.timeline}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Attachments:</span>
                        <span className="font-medium">{selectedSubmission.attachments} files</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Project Description</h3>
                    <p className="mt-2 text-sm whitespace-pre-wrap border rounded-md p-3 bg-muted/50">
                      {selectedSubmission.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Status</h3>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-muted-foreground">Current Status:</span>
                      {getStatusBadge(selectedSubmission.status)}
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="status-update">Update Status</Label>
                      <Select onValueChange={handleUpdateSubmissionStatus}>
                        <SelectTrigger id="status-update" className="mt-1">
                          <SelectValue placeholder="Select a new status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Add Response</h3>
                    <Textarea className="mt-2" placeholder="Type your response here..." rows={4} />
                    <Button className="mt-2">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Response
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsSubmissionModalOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Details
                  </Button>
                  <Button>View Business Profile</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
