"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, Download, Filter, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for API usage
const dailyUsageData = [
  { date: "2023-05-01", calls: 245, errors: 12 },
  { date: "2023-05-02", calls: 267, errors: 8 },
  { date: "2023-05-03", calls: 289, errors: 15 },
  { date: "2023-05-04", calls: 302, errors: 10 },
  { date: "2023-05-05", calls: 356, errors: 14 },
  { date: "2023-05-06", calls: 278, errors: 9 },
  { date: "2023-05-07", calls: 198, errors: 5 },
  { date: "2023-05-08", calls: 325, errors: 16 },
  { date: "2023-05-09", calls: 367, errors: 12 },
  { date: "2023-05-10", calls: 389, errors: 18 },
  { date: "2023-05-11", calls: 412, errors: 21 },
  { date: "2023-05-12", calls: 398, errors: 14 },
  { date: "2023-05-13", calls: 344, errors: 11 },
  { date: "2023-05-14", calls: 285, errors: 7 },
]

const businessUsageData = [
  {
    id: 1,
    name: "Acme Inc",
    plan: "Enterprise",
    apiCalls: 1245,
    successRate: 98.2,
    avgResponseTime: 124,
    lastUsed: "2023-05-14 14:23:45",
    endpoints: {
      quotes: 876,
      businesses: 245,
      users: 124,
    },
  },
  {
    id: 2,
    name: "TechSolutions Ltd",
    plan: "Basic",
    apiCalls: 342,
    successRate: 95.7,
    avgResponseTime: 156,
    lastUsed: "2023-05-14 10:15:32",
    endpoints: {
      quotes: 298,
      businesses: 32,
      users: 12,
    },
  },
  {
    id: 3,
    name: "Global Enterprises",
    plan: "Professional",
    apiCalls: 876,
    successRate: 97.5,
    avgResponseTime: 132,
    lastUsed: "2023-05-14 12:45:18",
    endpoints: {
      quotes: 654,
      businesses: 145,
      users: 77,
    },
  },
  {
    id: 4,
    name: "Innovate Design Studio",
    plan: "Professional",
    apiCalls: 567,
    successRate: 99.1,
    avgResponseTime: 118,
    lastUsed: "2023-05-14 09:30:55",
    endpoints: {
      quotes: 432,
      businesses: 98,
      users: 37,
    },
  },
  {
    id: 5,
    name: "Quantum Software Inc",
    plan: "Enterprise",
    apiCalls: 1532,
    successRate: 98.8,
    avgResponseTime: 115,
    lastUsed: "2023-05-14 15:10:22",
    endpoints: {
      quotes: 1087,
      businesses: 312,
      users: 133,
    },
  },
]

const endpointUsageData = [
  { name: "/api/quotes", calls: 3347, percentage: 58 },
  { name: "/api/businesses", calls: 832, percentage: 14 },
  { name: "/api/users", calls: 383, percentage: 7 },
  { name: "/api/templates", calls: 645, percentage: 11 },
  { name: "/api/webhooks", calls: 355, percentage: 6 },
  { name: "/api/other", calls: 232, percentage: 4 },
]

const errorTypesData = [
  { name: "Authentication", value: 42 },
  { name: "Rate Limit", value: 28 },
  { name: "Validation", value: 35 },
  { name: "Server Error", value: 15 },
  { name: "Timeout", value: 10 },
]

const photoUploadData = [
  { date: "2023-05-01", uploads: 24 },
  { date: "2023-05-02", uploads: 31 },
  { date: "2023-05-03", uploads: 18 },
  { date: "2023-05-04", uploads: 42 },
  { date: "2023-05-05", uploads: 36 },
  { date: "2023-05-06", uploads: 29 },
  { date: "2023-05-07", uploads: 15 },
  { date: "2023-05-08", uploads: 33 },
  { date: "2023-05-09", uploads: 27 },
  { date: "2023-05-10", uploads: 39 },
  { date: "2023-05-11", uploads: 44 },
  { date: "2023-05-12", uploads: 38 },
  { date: "2023-05-13", uploads: 22 },
  { date: "2023-05-14", uploads: 35 },
]

const businessPhotoUsage = [
  { id: 1, name: "Acme Inc", totalUploads: 145, avgSize: 2.4, activeUsers: 12, lastUpload: "2023-05-14" },
  { id: 2, name: "TechSolutions Ltd", totalUploads: 32, avgSize: 1.8, activeUsers: 3, lastUpload: "2023-05-10" },
  { id: 3, name: "Global Enterprises", totalUploads: 87, avgSize: 3.1, activeUsers: 8, lastUpload: "2023-05-13" },
  { id: 4, name: "Innovate Design Studio", totalUploads: 215, avgSize: 4.2, activeUsers: 15, lastUpload: "2023-05-14" },
  { id: 5, name: "Quantum Software Inc", totalUploads: 56, avgSize: 2.7, activeUsers: 6, lastUpload: "2023-05-12" },
]

const photoTypeData = [
  { name: "JPG/JPEG", value: 65 },
  { name: "PNG", value: 25 },
  { name: "GIF", value: 5 },
  { name: "Other", value: 5 },
]

// Calculate total photo uploads
const totalPhotoUploads = businessPhotoUsage.reduce((total, business) => total + business.totalUploads, 0)

// Calculate percentage of businesses using photo uploads
const businessesUsingPhotos = businessPhotoUsage.filter((b) => b.totalUploads > 0).length
const photoUsagePercentage = (businessesUsingPhotos / businessUsageData.length) * 100

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

// Calculate total API calls
const totalApiCalls = businessUsageData.reduce((total, business) => total + business.apiCalls, 0)

// Calculate average success rate
const avgSuccessRate =
  businessUsageData.reduce((total, business) => total + business.successRate, 0) / businessUsageData.length

// Calculate total errors
const totalErrors = dailyUsageData.reduce((total, day) => total + day.errors, 0)

export default function ApiUsagePage() {
  const [timeRange, setTimeRange] = useState("14days")
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [isBusinessDetailOpen, setIsBusinessDetailOpen] = useState(false)

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value)
    // In a real app, this would refresh the data for the selected time range
  }

  const handleExportData = () => {
    // In a real app, this would generate and download a report
    alert(`Exporting API usage data for the last ${timeRange}`)
  }

  const handleRefreshData = () => {
    // In a real app, this would refresh the data
    alert("Refreshing API usage data")
  }

  const handleViewBusinessDetail = (business: any) => {
    setSelectedBusiness(business)
    setIsBusinessDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">API Usage</h1>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 hours</SelectItem>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="14days">Last 14 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh data</span>
          </Button>
          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total API Calls</CardTitle>
            <CardDescription>Across all businesses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApiCalls.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Success Rate</CardTitle>
            <CardDescription>Average across all calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{avgSuccessRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Errors</CardTitle>
            <CardDescription>Failed API calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalErrors}</div>
            <p className="text-xs text-muted-foreground">-3.2% from last period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Businesses</CardTitle>
            <CardDescription>Using the API</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{businessUsageData.length}</div>
            <p className="text-xs text-muted-foreground">+1 from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Over Time Chart */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>API Usage Over Time</CardTitle>
          <CardDescription>Daily API calls and errors</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calls" stroke="#4f46e5" name="API Calls" strokeWidth={2} />
                <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Business Usage and Endpoint Usage */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usage by Endpoint</CardTitle>
                <CardDescription>Distribution of API calls by endpoint</CardDescription>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Filter Endpoints</h4>
                      <p className="text-sm text-muted-foreground">Select which endpoints to include in the chart</p>
                    </div>
                    <div className="grid gap-2">
                      {endpointUsageData.map((endpoint) => (
                        <div key={endpoint.name} className="flex items-center space-x-2">
                          <input type="checkbox" id={endpoint.name} defaultChecked />
                          <Label htmlFor={endpoint.name}>{endpoint.name}</Label>
                        </div>
                      ))}
                    </div>
                    <Button>Apply Filters</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={endpointUsageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calls" fill="#4f46e5" name="API Calls" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Error Types</CardTitle>
            <CardDescription>Distribution of API errors by type</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {errorTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Usage Table */}
      <Card>
        <CardHeader>
          <CardTitle>Business API Usage</CardTitle>
          <CardDescription>API usage by business</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
            </TabsList>
            <div className="mt-4 rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>API Calls</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Avg Response Time</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {businessUsageData.map((business) => (
                    <TableRow key={business.id}>
                      <TableCell className="font-medium">{business.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{business.plan}</Badge>
                      </TableCell>
                      <TableCell>{business.apiCalls.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            business.successRate > 98
                              ? "bg-green-500"
                              : business.successRate > 95
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }
                        >
                          {business.successRate}%
                        </Badge>
                      </TableCell>
                      <TableCell>{business.avgResponseTime} ms</TableCell>
                      <TableCell>{business.lastUsed}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleViewBusinessDetail(business)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Photo Upload Usage Section */}
      <Card>
        <CardHeader>
          <CardTitle>Photo Upload Usage</CardTitle>
          <CardDescription>Analysis of photo upload feature usage across businesses</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="businesses">By Business</TabsTrigger>
              <TabsTrigger value="trends">Usage Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 pt-4">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Uploads</CardTitle>
                    <CardDescription>All-time photo uploads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{totalPhotoUploads.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">+8.5% from last period</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Businesses Using</CardTitle>
                    <CardDescription>Adoption rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{photoUsagePercentage.toFixed(0)}%</div>
                    <p className="text-xs text-muted-foreground">
                      {businessesUsingPhotos} out of {businessUsageData.length} businesses
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Avg. Uploads</CardTitle>
                    <CardDescription>Per business</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{Math.round(totalPhotoUploads / businessesUsingPhotos)}</div>
                    <p className="text-xs text-muted-foreground">For businesses using photos</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Active Users</CardTitle>
                    <CardDescription>Using photo uploads</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">
                      {businessPhotoUsage.reduce((total, business) => total + business.activeUsers, 0)}
                    </div>
                    <p className="text-xs text-muted-foreground">Across all businesses</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Photo Upload Trends</CardTitle>
                    <CardDescription>Daily photo uploads</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={photoUploadData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="uploads"
                            stroke="#4f46e5"
                            name="Photo Uploads"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="flex flex-col">
                  <CardHeader>
                    <CardTitle>Photo Types</CardTitle>
                    <CardDescription>Distribution by file format</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={photoTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {photoTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage Analysis</CardTitle>
                  <CardDescription>Is the photo upload feature necessary?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Adoption Rate</span>
                      <div className="w-2/3 bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                        <div
                          className="bg-primary h-4 rounded-full"
                          style={{ width: `${photoUsagePercentage}%` }}
                        ></div>
                      </div>
                      <span>{photoUsagePercentage.toFixed(0)}%</span>
                    </div>

                    <div className="rounded-lg border p-4 bg-muted/50">
                      <h3 className="text-lg font-medium mb-2">Feature Assessment</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Based on current usage patterns, the photo upload feature is{" "}
                        {photoUsagePercentage >= 50 ? "widely adopted" : "moderately adopted"}
                        across your client base.{" "}
                        {photoUsagePercentage >= 70
                          ? "This indicates it is a valuable feature that should be maintained and enhanced."
                          : photoUsagePercentage >= 40
                            ? "This suggests the feature provides value to a significant portion of your clients and should be maintained."
                            : "This suggests the feature may need promotion or enhancement to increase adoption."}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium">Strengths</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>{businessesUsingPhotos} businesses actively using the feature</li>
                            <li>
                              Average of {Math.round(totalPhotoUploads / businessesUsingPhotos)} uploads per business
                            </li>
                            <li>Consistent usage pattern over time</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium">Recommendations</h4>
                          <ul className="list-disc pl-5 space-y-1 mt-2">
                            <li>
                              {photoUsagePercentage < 70
                                ? "Promote feature benefits to increase adoption"
                                : "Continue supporting this valuable feature"}
                            </li>
                            <li>
                              Consider{" "}
                              {photoUsagePercentage < 50
                                ? "making the feature more intuitive"
                                : "adding more advanced photo editing capabilities"}
                            </li>
                            <li>Monitor storage costs relative to business value</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="businesses" className="pt-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Business Name</TableHead>
                      <TableHead>Total Uploads</TableHead>
                      <TableHead>Avg. Size (MB)</TableHead>
                      <TableHead>Active Users</TableHead>
                      <TableHead>Last Upload</TableHead>
                      <TableHead>Usage Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {businessPhotoUsage
                      .sort((a, b) => b.totalUploads - a.totalUploads)
                      .map((business) => (
                        <TableRow key={business.id}>
                          <TableCell className="font-medium">{business.name}</TableCell>
                          <TableCell>{business.totalUploads.toLocaleString()}</TableCell>
                          <TableCell>{business.avgSize} MB</TableCell>
                          <TableCell>{business.activeUsers}</TableCell>
                          <TableCell>{business.lastUpload}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                business.totalUploads > 100
                                  ? "bg-green-500"
                                  : business.totalUploads > 50
                                    ? "bg-blue-500"
                                    : business.totalUploads > 10
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                              }
                            >
                              {business.totalUploads > 100
                                ? "Heavy"
                                : business.totalUploads > 50
                                  ? "Moderate"
                                  : business.totalUploads > 10
                                    ? "Light"
                                    : "Minimal"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Photo Upload Trends</CardTitle>
                  <CardDescription>6-month usage pattern</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { month: "Dec 2022", uploads: 245 },
                          { month: "Jan 2023", uploads: 312 },
                          { month: "Feb 2023", uploads: 287 },
                          { month: "Mar 2023", uploads: 356 },
                          { month: "Apr 2023", uploads: 389 },
                          { month: "May 2023", uploads: 433 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uploads" name="Photo Uploads" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Business Size</CardTitle>
                    <CardDescription>Photo uploads correlated with business size</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { size: "Small (1-10 employees)", uploads: 156, businesses: 2 },
                            { size: "Medium (11-50 employees)", uploads: 287, businesses: 2 },
                            { size: "Large (51+ employees)", uploads: 490, businesses: 1 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="size" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="uploads" name="Avg. Photo Uploads" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Usage by Subscription Plan</CardTitle>
                    <CardDescription>Photo uploads by plan type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { plan: "Basic", uploads: 32, businesses: 1 },
                            { plan: "Professional", uploads: 302, businesses: 2 },
                            { plan: "Enterprise", uploads: 201, businesses: 2 },
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="plan" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="uploads" name="Avg. Photo Uploads" fill="#4f46e5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Business Detail Modal */}
      <Dialog open={isBusinessDetailOpen} onOpenChange={setIsBusinessDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBusiness.name}</DialogTitle>
                <DialogDescription>API usage details and analytics</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="endpoints">Endpoint Usage</TabsTrigger>
                  <TabsTrigger value="photos">Photo Uploads</TabsTrigger>
                  <TabsTrigger value="logs">API Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 pt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Total API Calls</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{selectedBusiness.apiCalls.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">+8.2% from last period</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Success Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{selectedBusiness.successRate}%</div>
                        <p className="text-xs text-muted-foreground">+0.5% from last period</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Avg Response Time</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{selectedBusiness.avgResponseTime} ms</div>
                        <p className="text-xs text-muted-foreground">-12 ms from last period</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>API Usage Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={dailyUsageData.map((day) => ({
                              ...day,
                              calls: Math.round(day.calls * (selectedBusiness.apiCalls / totalApiCalls)),
                            }))}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="calls" stroke="#4f46e5" name="API Calls" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="endpoints" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Endpoint Usage</CardTitle>
                      <CardDescription>API calls by endpoint</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "/api/quotes", calls: selectedBusiness.endpoints.quotes },
                              { name: "/api/businesses", calls: selectedBusiness.endpoints.businesses },
                              { name: "/api/users", calls: selectedBusiness.endpoints.users },
                            ]}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="calls" fill="#4f46e5" name="API Calls" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Endpoint</TableHead>
                          <TableHead>API Calls</TableHead>
                          <TableHead>Success Rate</TableHead>
                          <TableHead>Avg Response Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">/api/quotes</TableCell>
                          <TableCell>{selectedBusiness.endpoints.quotes.toLocaleString()}</TableCell>
                          <TableCell>98.5%</TableCell>
                          <TableCell>118 ms</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">/api/businesses</TableCell>
                          <TableCell>{selectedBusiness.endpoints.businesses.toLocaleString()}</TableCell>
                          <TableCell>99.2%</TableCell>
                          <TableCell>105 ms</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">/api/users</TableCell>
                          <TableCell>{selectedBusiness.endpoints.users.toLocaleString()}</TableCell>
                          <TableCell>97.8%</TableCell>
                          <TableCell>132 ms</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="photos" className="space-y-4 pt-4">
                  <div className="grid gap-6 md:grid-cols-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Total Uploads</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {selectedBusiness
                            ? businessPhotoUsage.find((b) => b.id === selectedBusiness.id)?.totalUploads || 0
                            : 0}
                        </div>
                        <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Active Users</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {selectedBusiness
                            ? businessPhotoUsage.find((b) => b.id === selectedBusiness.id)?.activeUsers || 0
                            : 0}
                        </div>
                        <p className="text-xs text-muted-foreground">Using photo uploads</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Avg. File Size</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {selectedBusiness
                            ? businessPhotoUsage.find((b) => b.id === selectedBusiness.id)?.avgSize || 0
                            : 0}{" "}
                          MB
                        </div>
                        <p className="text-xs text-muted-foreground">Per upload</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upload History</CardTitle>
                      <CardDescription>Recent photo uploads</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Date</TableHead>
                              <TableHead>User</TableHead>
                              <TableHead>File Name</TableHead>
                              <TableHead>Size</TableHead>
                              <TableHead>Type</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell>2023-05-14</TableCell>
                              <TableCell>john.doe@example.com</TableCell>
                              <TableCell>product-image-01.jpg</TableCell>
                              <TableCell>2.4 MB</TableCell>
                              <TableCell>JPG</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-05-13</TableCell>
                              <TableCell>sarah.smith@example.com</TableCell>
                              <TableCell>team-photo.png</TableCell>
                              <TableCell>3.8 MB</TableCell>
                              <TableCell>PNG</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-05-12</TableCell>
                              <TableCell>john.doe@example.com</TableCell>
                              <TableCell>logo-transparent.png</TableCell>
                              <TableCell>1.2 MB</TableCell>
                              <TableCell>PNG</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-05-10</TableCell>
                              <TableCell>mike.johnson@example.com</TableCell>
                              <TableCell>office-location.jpg</TableCell>
                              <TableCell>2.7 MB</TableCell>
                              <TableCell>JPG</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2023-05-08</TableCell>
                              <TableCell>sarah.smith@example.com</TableCell>
                              <TableCell>product-demo.gif</TableCell>
                              <TableCell>4.5 MB</TableCell>
                              <TableCell>GIF</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="logs" className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Search logs..." className="w-[300px]" />
                      <Button variant="outline" size="sm">
                        Search
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter Logs</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>All Logs</DropdownMenuItem>
                          <DropdownMenuItem>Successful Requests</DropdownMenuItem>
                          <DropdownMenuItem>Failed Requests</DropdownMenuItem>
                          <DropdownMenuItem>Authentication Errors</DropdownMenuItem>
                          <DropdownMenuItem>Rate Limit Errors</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
                          <TableHead>Timestamp</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Endpoint</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Response Time</TableHead>
                          <TableHead>IP Address</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2023-05-14 15:10:22</TableCell>
                          <TableCell>POST</TableCell>
                          <TableCell>/api/quotes</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">200 OK</Badge>
                          </TableCell>
                          <TableCell>118 ms</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-14 15:08:45</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>/api/businesses</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">200 OK</Badge>
                          </TableCell>
                          <TableCell>95 ms</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-14 15:05:12</TableCell>
                          <TableCell>POST</TableCell>
                          <TableCell>/api/quotes</TableCell>
                          <TableCell>
                            <Badge className="bg-red-500">401 Unauthorized</Badge>
                          </TableCell>
                          <TableCell>65 ms</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-14 15:02:38</TableCell>
                          <TableCell>GET</TableCell>
                          <TableCell>/api/users</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">200 OK</Badge>
                          </TableCell>
                          <TableCell>112 ms</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2023-05-14 14:58:19</TableCell>
                          <TableCell>POST</TableCell>
                          <TableCell>/api/quotes</TableCell>
                          <TableCell>
                            <Badge className="bg-green-500">200 OK</Badge>
                          </TableCell>
                          <TableCell>124 ms</TableCell>
                          <TableCell>192.168.1.1</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="flex items-center justify-center space-x-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsBusinessDetailOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Logs
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
