"use client"

import { useState } from "react"
import { ArrowUpDown, Eye, MoreHorizontal, UserPlus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for businesses
const businesses = [
  {
    id: 1,
    name: "Acme Inc",
    email: "admin@acme.com",
    signupDate: "2023-01-15",
    status: "Active",
    plan: "Enterprise",
    lastLogin: "2023-05-01",
    quotesGenerated: 145,
    logo: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 123-4567",
    services: ["Web Development", "Mobile Apps", "UI/UX Design"],
    subscription: {
      plan: "Enterprise",
      price: "$499/month",
      startDate: "2023-01-15",
      nextBilling: "2023-06-15",
      features: ["Unlimited Quotes", "Custom Branding", "API Access", "Priority Support"],
    },
    quoteHistory: [
      { id: 1, date: "2023-05-01", amount: "$12,500" },
      { id: 2, date: "2023-04-15", amount: "$8,750" },
      { id: 3, date: "2023-03-22", amount: "$15,000" },
      { id: 4, date: "2023-02-10", amount: "$9,200" },
      { id: 5, date: "2023-01-28", amount: "$11,500" },
    ],
  },
  {
    id: 2,
    name: "TechSolutions Ltd",
    email: "info@techsolutions.com",
    signupDate: "2023-02-20",
    status: "Trial",
    plan: "Basic",
    lastLogin: "2023-05-02",
    quotesGenerated: 12,
    logo: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 987-6543",
    services: ["Cloud Services", "IT Consulting"],
    subscription: {
      plan: "Basic",
      price: "$99/month",
      startDate: "2023-02-20",
      nextBilling: "2023-06-20",
      features: ["10 Quotes/month", "Basic Templates", "Email Support"],
    },
    quoteHistory: [
      { id: 1, date: "2023-05-01", amount: "$5,500" },
      { id: 2, date: "2023-04-22", amount: "$4,200" },
      { id: 3, date: "2023-03-15", amount: "$6,800" },
    ],
  },
  {
    id: 3,
    name: "Global Enterprises",
    email: "contact@globalent.com",
    signupDate: "2022-11-05",
    status: "Canceled",
    plan: "Professional",
    lastLogin: "2023-04-15",
    quotesGenerated: 87,
    logo: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 456-7890",
    services: ["Business Consulting", "Financial Services", "Marketing"],
    subscription: {
      plan: "Professional (Canceled)",
      price: "$299/month",
      startDate: "2022-11-05",
      endDate: "2023-04-15",
      features: ["50 Quotes/month", "Custom Templates", "Priority Support"],
    },
    quoteHistory: [
      { id: 1, date: "2023-04-10", amount: "$18,500" },
      { id: 2, date: "2023-03-25", amount: "$22,000" },
      { id: 3, date: "2023-02-18", amount: "$15,750" },
      { id: 4, date: "2023-01-30", amount: "$19,200" },
    ],
  },
  {
    id: 4,
    name: "Innovate Design Studio",
    email: "hello@innovatedesign.com",
    signupDate: "2023-03-10",
    status: "Active",
    plan: "Professional",
    lastLogin: "2023-05-03",
    quotesGenerated: 56,
    logo: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 234-5678",
    services: ["Graphic Design", "Brand Identity", "Print Services"],
    subscription: {
      plan: "Professional",
      price: "$299/month",
      startDate: "2023-03-10",
      nextBilling: "2023-06-10",
      features: ["50 Quotes/month", "Custom Templates", "Priority Support"],
    },
    quoteHistory: [
      { id: 1, date: "2023-05-02", amount: "$7,800" },
      { id: 2, date: "2023-04-18", amount: "$9,500" },
      { id: 3, date: "2023-03-25", amount: "$6,200" },
    ],
  },
  {
    id: 5,
    name: "Quantum Software Inc",
    email: "support@quantumsoftware.com",
    signupDate: "2023-01-28",
    status: "Active",
    plan: "Enterprise",
    lastLogin: "2023-05-02",
    quotesGenerated: 132,
    logo: "/placeholder.svg?height=80&width=80",
    phone: "+1 (555) 876-5432",
    services: ["Software Development", "AI Solutions", "Data Analytics"],
    subscription: {
      plan: "Enterprise",
      price: "$499/month",
      startDate: "2023-01-28",
      nextBilling: "2023-06-28",
      features: ["Unlimited Quotes", "Custom Branding", "API Access", "Priority Support"],
    },
    quoteHistory: [
      { id: 1, date: "2023-05-01", amount: "$24,500" },
      { id: 2, date: "2023-04-15", amount: "$18,750" },
      { id: 3, date: "2023-03-22", amount: "$22,000" },
      { id: 4, date: "2023-02-10", amount: "$19,200" },
    ],
  },
]

export default function DashboardPage() {
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false)
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false)
  const [isAddBusinessModalOpen, setIsAddBusinessModalOpen] = useState(false)

  const handleViewBusiness = (business: any) => {
    setSelectedBusiness(business)
    setIsViewModalOpen(true)
  }

  const handleDeleteBusiness = (business: any) => {
    setSelectedBusiness(business)
    setIsDeleteModalOpen(true)
  }

  const handleSuspendBusiness = (business: any) => {
    setSelectedBusiness(business)
    setIsSuspendModalOpen(true)
  }

  const handleUpgradeBusiness = (business: any) => {
    setSelectedBusiness(business)
    setIsUpgradeModalOpen(true)
  }

  const handleAddBusiness = () => {
    setIsAddBusinessModalOpen(true)
  }

  const handleSendMessage = (business: any) => {
    // In a real app, this would open a messaging interface
    alert(`Sending message to ${business.name}`)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the business
    alert(`Business ${selectedBusiness.name} would be deleted`)
    setIsDeleteModalOpen(false)
  }

  const confirmSuspend = () => {
    // In a real app, this would call an API to suspend the business
    alert(`Business ${selectedBusiness.name} would be suspended`)
    setIsSuspendModalOpen(false)
  }

  const confirmUpgrade = () => {
    // In a real app, this would call an API to upgrade the business
    alert(`Business ${selectedBusiness.name} would be upgraded`)
    setIsUpgradeModalOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-500">Active</Badge>
      case "Trial":
        return <Badge className="bg-blue-500">Trial</Badge>
      case "Canceled":
        return <Badge className="bg-red-500">Canceled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Businesses</h1>
        <Button onClick={handleAddBusiness}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Business
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Businesses</CardTitle>
          <CardDescription>Manage all registered businesses and their subscriptions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <div className="flex items-center space-x-1">
                      <span>Business Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Owner Email</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription Plan</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Quotes Generated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {businesses.map((business) => (
                  <TableRow key={business.id}>
                    <TableCell className="font-medium">{business.name}</TableCell>
                    <TableCell>{business.email}</TableCell>
                    <TableCell>{business.signupDate}</TableCell>
                    <TableCell>{getStatusBadge(business.status)}</TableCell>
                    <TableCell>{business.plan}</TableCell>
                    <TableCell>{business.lastLogin}</TableCell>
                    <TableCell>{business.quotesGenerated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewBusiness(business)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">View</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleUpgradeBusiness(business)}>
                              <span>Upgrade Plan</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleSendMessage(business)}>
                              <span>Send Message</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-yellow-600"
                              onClick={() => handleSuspendBusiness(business)}
                            >
                              <span>Suspend Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteBusiness(business)}>
                              <span>Delete Account</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Business Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBusiness && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedBusiness.name}</DialogTitle>
                <DialogDescription>Business details and subscription information</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Company Details</TabsTrigger>
                  <TabsTrigger value="subscription">Subscription</TabsTrigger>
                  <TabsTrigger value="quotes">Quote History</TabsTrigger>
                  <TabsTrigger value="embed">Embed Code</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={selectedBusiness.logo || "/placeholder.svg"}
                      alt={selectedBusiness.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{selectedBusiness.name}</h3>
                      <p className="text-muted-foreground">{selectedBusiness.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Email:</span>
                          <span>{selectedBusiness.email}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phone:</span>
                          <span>{selectedBusiness.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Signup Date:</span>
                          <span>{selectedBusiness.signupDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Login:</span>
                          <span>{selectedBusiness.lastLogin}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Services Offered</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBusiness.services.map((service: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="subscription" className="space-y-4 pt-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-xl font-semibold">{selectedBusiness.subscription.plan}</h3>
                        <p className="text-muted-foreground">{selectedBusiness.subscription.price}</p>
                      </div>
                      <Button>Change Plan</Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Start Date:</span>
                        <span>{selectedBusiness.subscription.startDate}</span>
                      </div>
                      {selectedBusiness.subscription.nextBilling && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Next Billing:</span>
                          <span>{selectedBusiness.subscription.nextBilling}</span>
                        </div>
                      )}
                      {selectedBusiness.subscription.endDate && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">End Date:</span>
                          <span>{selectedBusiness.subscription.endDate}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Features</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedBusiness.subscription.features.map((feature: string, index: number) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="quotes" className="space-y-4 pt-4">
                  <div className="rounded-lg border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Quote ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedBusiness.quoteHistory.map((quote: any) => (
                          <TableRow key={quote.id}>
                            <TableCell>#{quote.id}</TableCell>
                            <TableCell>{quote.date}</TableCell>
                            <TableCell>{quote.amount}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only md:not-sr-only md:ml-2">View</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="embed" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Embed Code</h4>
                      <p className="text-muted-foreground mb-4">
                        Copy and paste this code snippet into your website to display the quote generator.
                      </p>
                      <div className="relative">
                        <Textarea
                          readOnly
                          className="font-mono text-sm h-32"
                          value={`<script src="https://quotegen.example.com/embed.js" data-business-id="${selectedBusiness.id}"></script>
<div id="quote-generator-container"></div>`}
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `<script src="https://quotegen.example.com/embed.js" data-business-id="${selectedBusiness.id}"></script>\n<div id="quote-generator-container"></div>`,
                            )
                          }}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Customization Options</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="theme">Theme</Label>
                          <Input id="theme" defaultValue="default" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primary Color</Label>
                          <Input id="primary-color" defaultValue="#4f46e5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleSendMessage(selectedBusiness)}>
                    Send Message
                  </Button>
                  <Button onClick={() => handleUpgradeBusiness(selectedBusiness)}>Adjust Plan</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Business</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedBusiness?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Confirmation Modal */}
      <Dialog open={isSuspendModalOpen} onOpenChange={setIsSuspendModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend Business</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend {selectedBusiness?.name}? They will not be able to access their account
              until reinstated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuspendModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={confirmSuspend}>
              Suspend
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upgrade Plan Modal */}
      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upgrade Plan</DialogTitle>
            <DialogDescription>Select a new plan for {selectedBusiness?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" onClick={confirmUpgrade}>
                Basic
              </Button>
              <Button variant="outline" onClick={confirmUpgrade}>
                Professional
              </Button>
              <Button variant="outline" onClick={confirmUpgrade}>
                Enterprise
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpgradeModalOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Business Modal */}
      <Dialog open={isAddBusinessModalOpen} onOpenChange={setIsAddBusinessModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Business</DialogTitle>
            <DialogDescription>Enter the details for the new business.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="business-name" className="text-right">
                Business Name
              </Label>
              <Input id="business-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="business-email" className="text-right">
                Email
              </Label>
              <Input id="business-email" type="email" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="business-plan" className="text-right">
                Plan
              </Label>
              <Select>
                <SelectTrigger id="business-plan" className="col-span-3">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddBusinessModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => {
                alert("Business would be added")
                setIsAddBusinessModalOpen(false)
              }}
            >
              Add Business
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
