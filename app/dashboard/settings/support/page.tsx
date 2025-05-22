"use client"

import { useState } from "react"
import {
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Filter,
  MessageSquare,
  MoreHorizontal,
  PlusCircle,
  RefreshCw,
  Search,
  User,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"

// Mock data for support staff
const supportStaff = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Manager",
    status: "Available",
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Senior Support Agent",
    status: "Busy",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Agent",
    status: "Available",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    role: "Support Agent",
    status: "Away",
  },
]

// Mock data for tickets (including quote submissions converted to tickets)
const ticketsData = [
  {
    id: "T-1001",
    source: "Quote Submission",
    sourceId: "QS-1001",
    subject: "Website Development Quote Request",
    businessName: "Acme Inc",
    contactName: "John Doe",
    contactEmail: "john.doe@acme.com",
    createdAt: "2023-05-14 09:23:45",
    updatedAt: "2023-05-14 10:15:22",
    status: "Open",
    priority: "Medium",
    category: "Quote Request",
    assignedTo: 2,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "John Doe",
        content:
          "We need a new website for our company that showcases our products and services. The website should be modern, responsive, and easy to navigate.",
        timestamp: "2023-05-14 09:23:45",
        attachments: 2,
      },
      {
        id: 2,
        type: "staff",
        sender: "Sarah Williams",
        content:
          "Thank you for your interest in our services. I'll review your requirements and get back to you with some questions to better understand your needs.",
        timestamp: "2023-05-14 10:15:22",
      },
    ],
    metadata: {
      services: ["Web Development", "UI/UX Design"],
      budget: "$15,000 - $25,000",
      timeline: "3-6 months",
    },
  },
  {
    id: "T-1002",
    source: "Quote Submission",
    sourceId: "QS-1002",
    subject: "Mobile App Development Quote Request",
    businessName: "TechSolutions Ltd",
    contactName: "Jane Smith",
    contactEmail: "jane.smith@techsolutions.com",
    createdAt: "2023-05-13 14:45:12",
    updatedAt: "2023-05-14 11:30:45",
    status: "In Progress",
    priority: "High",
    category: "Quote Request",
    assignedTo: 3,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "Jane Smith",
        content:
          "We're looking to develop a mobile app for our customers to access our services on the go. The app should be available on both iOS and Android platforms.",
        timestamp: "2023-05-13 14:45:12",
        attachments: 1,
      },
      {
        id: 2,
        type: "staff",
        sender: "Michael Brown",
        content:
          "Thanks for reaching out! I'd like to schedule a call to discuss your mobile app requirements in more detail. Would you be available tomorrow at 2 PM?",
        timestamp: "2023-05-14 09:20:33",
      },
      {
        id: 3,
        type: "customer",
        sender: "Jane Smith",
        content: "That works for me. I'll be available at 2 PM tomorrow.",
        timestamp: "2023-05-14 11:30:45",
      },
    ],
    metadata: {
      services: ["Mobile App Development"],
      budget: "$30,000 - $50,000",
      timeline: "6-9 months",
    },
  },
  {
    id: "T-1003",
    source: "Quote Submission",
    sourceId: "QS-1003",
    subject: "Cloud Migration Services Quote",
    businessName: "Global Enterprises",
    contactName: "Mike Johnson",
    contactEmail: "mike.johnson@globalent.com",
    createdAt: "2023-05-12 11:32:18",
    updatedAt: "2023-05-13 15:45:30",
    status: "Resolved",
    priority: "Medium",
    category: "Quote Request",
    assignedTo: 1,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "Mike Johnson",
        content:
          "We need help migrating our infrastructure to the cloud. We're currently using on-premises servers and want to move to a more scalable solution.",
        timestamp: "2023-05-12 11:32:18",
      },
      {
        id: 2,
        type: "staff",
        sender: "Alex Johnson",
        content:
          "Thank you for your inquiry. I've prepared a detailed quote for your cloud migration project. Please find it attached.",
        timestamp: "2023-05-13 15:45:30",
        attachments: 1,
      },
    ],
    metadata: {
      services: ["Cloud Services", "IT Consulting"],
      budget: "$10,000 - $15,000",
      timeline: "1-3 months",
    },
  },
  {
    id: "T-1004",
    source: "Email",
    subject: "Billing Question",
    businessName: "Quantum Software Inc",
    contactName: "David Brown",
    contactEmail: "david.brown@quantumsoftware.com",
    createdAt: "2023-05-14 13:22:45",
    updatedAt: "2023-05-14 14:15:10",
    status: "Open",
    priority: "Low",
    category: "Billing",
    assignedTo: null,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "David Brown",
        content:
          "I have a question about our last invoice. There seems to be a charge for additional services that we didn't use.",
        timestamp: "2023-05-14 13:22:45",
      },
    ],
    metadata: {},
  },
  {
    id: "T-1005",
    source: "Chat",
    subject: "API Integration Help",
    businessName: "Innovate Design Studio",
    contactName: "Sarah Williams",
    contactEmail: "sarah.williams@innovatedesign.com",
    createdAt: "2023-05-13 10:15:33",
    updatedAt: "2023-05-14 09:45:22",
    status: "In Progress",
    priority: "Medium",
    category: "Technical Support",
    assignedTo: 4,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "Sarah Williams",
        content: "We're having trouble integrating your API with our website. The authentication seems to be failing.",
        timestamp: "2023-05-13 10:15:33",
      },
      {
        id: 2,
        type: "staff",
        sender: "Emily Davis",
        content:
          "I'll help you troubleshoot the API integration. Could you please provide your API key and the error message you're receiving?",
        timestamp: "2023-05-13 11:30:45",
      },
      {
        id: 3,
        type: "customer",
        sender: "Sarah Williams",
        content: "Our API key is QG-API-12345. The error message is 'Authentication failed: Invalid credentials'.",
        timestamp: "2023-05-14 09:45:22",
      },
    ],
    metadata: {},
  },
  {
    id: "T-1006",
    source: "Quote Submission",
    sourceId: "QS-1004",
    subject: "Brand Identity Redesign Quote",
    businessName: "Innovate Design Studio",
    contactName: "Sarah Williams",
    contactEmail: "sarah.williams@innovatedesign.com",
    createdAt: "2023-05-11 16:18:33",
    updatedAt: "2023-05-11 16:18:33",
    status: "New",
    priority: "Medium",
    category: "Quote Request",
    assignedTo: null,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "Sarah Williams",
        content:
          "We need a complete brand refresh, including logo design, color palette, typography, and brand guidelines. Our current branding is outdated and doesn't reflect our company values.",
        timestamp: "2023-05-11 16:18:33",
        attachments: 3,
      },
    ],
    metadata: {
      services: ["Graphic Design", "Brand Identity"],
      budget: "$5,000 - $10,000",
      timeline: "1-2 months",
    },
  },
  {
    id: "T-1007",
    source: "Phone",
    subject: "Account Access Issue",
    businessName: "TechSolutions Ltd",
    contactName: "Robert Wilson",
    contactEmail: "robert.wilson@techsolutions.com",
    createdAt: "2023-05-14 11:05:18",
    updatedAt: "2023-05-14 11:25:33",
    status: "Resolved",
    priority: "High",
    category: "Account Management",
    assignedTo: 2,
    messages: [
      {
        id: 1,
        type: "staff",
        sender: "Sarah Williams",
        content:
          "Customer called regarding inability to log into their account. Reset their password and verified they can now access the system.",
        timestamp: "2023-05-14 11:05:18",
      },
      {
        id: 2,
        type: "staff",
        sender: "Sarah Williams",
        content:
          "Followed up with customer to confirm the issue is resolved. They confirmed everything is working now.",
        timestamp: "2023-05-14 11:25:33",
      },
    ],
    metadata: {},
  },
  {
    id: "T-1008",
    source: "Quote Submission",
    sourceId: "QS-1005",
    subject: "AI Software Development Quote",
    businessName: "Quantum Software Inc",
    contactName: "David Brown",
    contactEmail: "david.brown@quantumsoftware.com",
    createdAt: "2023-05-10 10:05:27",
    updatedAt: "2023-05-12 14:30:15",
    status: "In Progress",
    priority: "High",
    category: "Quote Request",
    assignedTo: 1,
    messages: [
      {
        id: 1,
        type: "customer",
        sender: "David Brown",
        content:
          "We're looking to develop a custom software solution that uses AI to analyze customer data and provide insights. The solution should integrate with our existing CRM system.",
        timestamp: "2023-05-10 10:05:27",
        attachments: 1,
      },
      {
        id: 2,
        type: "staff",
        sender: "Alex Johnson",
        content:
          "Thank you for your detailed requirements. I'd like to set up a meeting with our AI specialists to discuss your project in more depth. Would next Tuesday at 10 AM work for you?",
        timestamp: "2023-05-11 09:15:40",
      },
      {
        id: 3,
        type: "customer",
        sender: "David Brown",
        content: "Tuesday at 10 AM works great. Looking forward to discussing this further.",
        timestamp: "2023-05-12 14:30:15",
      },
    ],
    metadata: {
      services: ["Software Development", "AI Solutions"],
      budget: "$50,000 - $75,000",
      timeline: "9-12 months",
    },
  },
]

export default function SupportPage() {
  const [tickets, setTickets] = useState(ticketsData)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isTicketDetailOpen, setIsTicketDetailOpen] = useState(false)
  const [newResponseText, setNewResponseText] = useState("")
  const [ticketStatusFilter, setTicketStatusFilter] = useState("all")
  const [ticketCategoryFilter, setTicketCategoryFilter] = useState("all")
  const [ticketPriorityFilter, setTicketPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({
    subject: "",
    businessName: "",
    contactName: "",
    contactEmail: "",
    category: "General Inquiry",
    priority: "Medium",
    message: "",
  })
  const [isAssignTicketOpen, setIsAssignTicketOpen] = useState(false)
  const [selectedStaffMember, setSelectedStaffMember] = useState<number | null>(null)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({
    autoAssignTickets: true,
    sendEmailNotifications: true,
    defaultPriority: "Medium",
    ticketCategories: ["Quote Request", "Technical Support", "Billing", "Account Management", "General Inquiry"],
    autoCloseAfterDays: 7,
  })

  // Filter tickets based on selected filters and search query
  const filteredTickets = tickets.filter((ticket) => {
    // Filter by tab
    if (activeTab === "unassigned" && ticket.assignedTo !== null) return false
    if (activeTab === "mine" && ticket.assignedTo !== 2) return false // Assuming current user is ID 2 (Sarah Williams)
    if (activeTab === "resolved" && ticket.status !== "Resolved") return false

    // Filter by status
    if (ticketStatusFilter !== "all" && ticket.status.toLowerCase() !== ticketStatusFilter.toLowerCase()) return false

    // Filter by category
    if (ticketCategoryFilter !== "all" && ticket.category !== ticketCategoryFilter) return false

    // Filter by priority
    if (ticketPriorityFilter !== "all" && ticket.priority.toLowerCase() !== ticketPriorityFilter.toLowerCase())
      return false

    // Filter by assignee
    if (assigneeFilter !== "all") {
      if (assigneeFilter === "unassigned" && ticket.assignedTo !== null) return false
      if (assigneeFilter !== "unassigned" && ticket.assignedTo !== Number.parseInt(assigneeFilter)) return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        ticket.id.toLowerCase().includes(query) ||
        ticket.subject.toLowerCase().includes(query) ||
        ticket.businessName.toLowerCase().includes(query) ||
        ticket.contactName.toLowerCase().includes(query) ||
        ticket.contactEmail.toLowerCase().includes(query) ||
        ticket.messages.some((msg) => msg.content.toLowerCase().includes(query))
      )
    }

    return true
  })

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsTicketDetailOpen(true)
  }

  const handleQuickViewTicket = (ticket: any) => {
    setSelectedTicket(ticket)
    setIsQuickViewOpen(true)
  }

  const handleSendResponse = () => {
    if (!newResponseText.trim()) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        const newMessage = {
          id: Math.max(...ticket.messages.map((m) => m.id)) + 1,
          type: "staff",
          sender: "Sarah Williams", // Assuming current user
          content: newResponseText,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        }

        return {
          ...ticket,
          messages: [...ticket.messages, newMessage],
          updatedAt: newMessage.timestamp,
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      messages: [
        ...selectedTicket.messages,
        {
          id: Math.max(...selectedTicket.messages.map((m) => m.id)) + 1,
          type: "staff",
          sender: "Sarah Williams", // Assuming current user
          content: newResponseText,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        },
      ],
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    })
    setNewResponseText("")
  }

  const handleUpdateTicketStatus = (status: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          status,
          updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      status,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    })
  }

  const handleUpdateTicketPriority = (priority: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          priority,
          updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      priority,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    })
  }

  const handleAssignTicket = () => {
    if (selectedStaffMember === null) return

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          assignedTo: selectedStaffMember,
          updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
        }
      }
      return ticket
    })

    setTickets(updatedTickets)
    setSelectedTicket({
      ...selectedTicket,
      assignedTo: selectedStaffMember,
      updatedAt: new Date().toISOString().replace("T", " ").substring(0, 19),
    })
    setIsAssignTicketOpen(false)
  }

  const handleCreateTicket = () => {
    const newTicketId = `T-${1000 + tickets.length + 1}`
    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19)

    const ticketToAdd = {
      id: newTicketId,
      source: "Manual Entry",
      subject: newTicket.subject,
      businessName: newTicket.businessName,
      contactName: newTicket.contactName,
      contactEmail: newTicket.contactEmail,
      createdAt: timestamp,
      updatedAt: timestamp,
      status: "New",
      priority: newTicket.priority,
      category: newTicket.category,
      assignedTo: null,
      messages: [
        {
          id: 1,
          type: "staff",
          sender: "Sarah Williams", // Assuming current user
          content: newTicket.message,
          timestamp,
        },
      ],
      metadata: {},
    }

    setTickets([ticketToAdd, ...tickets])
    setIsCreateTicketOpen(false)
    setNewTicket({
      subject: "",
      businessName: "",
      contactName: "",
      contactEmail: "",
      category: "General Inquiry",
      priority: "Medium",
      message: "",
    })
  }

  const handleExportTickets = () => {
    // In a real app, this would generate and download a CSV or Excel file
    alert("Exporting tickets data")
  }

  const handleRefreshTickets = () => {
    // In a real app, this would refresh the data from the server
    alert("Refreshing tickets data")
  }

  const handleSaveSettings = () => {
    // In a real app, this would save settings to the server
    alert("Support settings saved successfully")
    setIsSettingsOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return <Badge className="bg-blue-500">New</Badge>
      case "Open":
        return <Badge className="bg-purple-500">Open</Badge>
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

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Low":
        return (
          <Badge variant="outline" className="border-green-500 text-green-500">
            Low
          </Badge>
        )
      case "Medium":
        return (
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            Medium
          </Badge>
        )
      case "High":
        return (
          <Badge variant="outline" className="border-yellow-500 text-yellow-500">
            High
          </Badge>
        )
      case "Urgent":
        return (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Urgent
          </Badge>
        )
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getAssigneeName = (assigneeId: number | null) => {
    if (assigneeId === null) return "Unassigned"
    const staff = supportStaff.find((s) => s.id === assigneeId)
    return staff ? staff.name : "Unknown"
  }

  const getAssigneeAvatar = (assigneeId: number | null) => {
    if (assigneeId === null) return null
    const staff = supportStaff.find((s) => s.id === assigneeId)
    return staff ? staff.avatar : null
  }

  const getAssigneeInitials = (assigneeId: number | null) => {
    if (assigneeId === null) return "UN"
    const staff = supportStaff.find((s) => s.id === assigneeId)
    if (!staff) return "UN"
    return staff.name
      .split(" ")
      .map((n) => n[0])
      .join("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Support</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleRefreshTickets}>
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Refresh</span>
          </Button>
          <Button variant="outline" onClick={handleExportTickets}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsCreateTicketOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Ticket
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="sr-only">Settings</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-3">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tickets</CardTitle>
                <CardDescription>Manage support tickets and quote submissions</CardDescription>
              </div>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[400px]">
                <TabsList className="grid grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
                  <TabsTrigger value="mine">My Tickets</TabsTrigger>
                  <TabsTrigger value="resolved">Resolved</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    className="pl-8 w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                        <h4 className="font-medium leading-none">Filter Tickets</h4>
                        <p className="text-sm text-muted-foreground">Filter tickets by various criteria</p>
                      </div>
                      <div className="grid gap-2">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="status-filter" className="text-right">
                            Status
                          </Label>
                          <Select value={ticketStatusFilter} onValueChange={setTicketStatusFilter}>
                            <SelectTrigger id="status-filter" className="col-span-3">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Statuses</SelectItem>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="open">Open</SelectItem>
                              <SelectItem value="in progress">In Progress</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category-filter" className="text-right">
                            Category
                          </Label>
                          <Select value={ticketCategoryFilter} onValueChange={setTicketCategoryFilter}>
                            <SelectTrigger id="category-filter" className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Categories</SelectItem>
                              {settings.ticketCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="priority-filter" className="text-right">
                            Priority
                          </Label>
                          <Select value={ticketPriorityFilter} onValueChange={setTicketPriorityFilter}>
                            <SelectTrigger id="priority-filter" className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Priorities</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="assignee-filter" className="text-right">
                            Assignee
                          </Label>
                          <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                            <SelectTrigger id="assignee-filter" className="col-span-3">
                              <SelectValue placeholder="Select assignee" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Assignees</SelectItem>
                              <SelectItem value="unassigned">Unassigned</SelectItem>
                              {supportStaff.map((staff) => (
                                <SelectItem key={staff.id} value={staff.id.toString()}>
                                  {staff.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
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
                    <TableHead>Subject</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-4">
                        No tickets found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate" title={ticket.subject}>
                            {ticket.subject}
                          </div>
                        </TableCell>
                        <TableCell>{ticket.businessName}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {ticket.assignedTo ? (
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={getAssigneeAvatar(ticket.assignedTo) || ""}
                                  alt={getAssigneeName(ticket.assignedTo)}
                                />
                                <AvatarFallback>{getAssigneeInitials(ticket.assignedTo)}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                            <span className="text-xs">{getAssigneeName(ticket.assignedTo)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs">{ticket.updatedAt.split(" ")[0]}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleQuickViewTicket(ticket)}>
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">Quick View</span>
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewTicket(ticket)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedTicket(ticket)
                                    setIsAssignTicketOpen(true)
                                    setSelectedStaffMember(ticket.assignedTo)
                                  }}
                                >
                                  <User className="mr-2 h-4 w-4" />
                                  <span>Assign Ticket</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedTicket(ticket)
                                    handleUpdateTicketStatus("Resolved")
                                  }}
                                >
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  <span>Mark as Resolved</span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Team</CardTitle>
            <CardDescription>Team members and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supportStaff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={staff.avatar || "/placeholder.svg"} alt={staff.name} />
                      <AvatarFallback>
                        {staff.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{staff.name}</p>
                      <p className="text-xs text-muted-foreground">{staff.role}</p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      staff.status === "Available"
                        ? "border-green-500 text-green-500"
                        : staff.status === "Busy"
                          ? "border-red-500 text-red-500"
                          : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {staff.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Manage Team
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Ticket Detail Modal */}
      <Dialog open={isTicketDetailOpen} onOpenChange={setIsTicketDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-2xl">{selectedTicket.subject}</DialogTitle>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                </div>
                <DialogDescription>
                  Ticket {selectedTicket.id} • {selectedTicket.source} • Created on {selectedTicket.createdAt}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                <div className="md:col-span-2 space-y-4">
                  <div className="space-y-4">
                    {selectedTicket.messages.map((message: any) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "staff" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.type === "staff" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{message.sender}</span>
                            <span className="text-xs">{message.timestamp}</span>
                          </div>
                          <p className="whitespace-pre-wrap">{message.content}</p>
                          {message.attachments && message.attachments > 0 && (
                            <div className="mt-2 text-xs">
                              {message.attachments} attachment{message.attachments > 1 ? "s" : ""}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="response">Reply</Label>
                    <Textarea
                      id="response"
                      placeholder="Type your response here..."
                      rows={4}
                      value={newResponseText}
                      onChange={(e) => setNewResponseText(e.target.value)}
                    />
                    <Button onClick={handleSendResponse} disabled={!newResponseText.trim()}>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Send Response
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Ticket Information</h3>
                    <div className="rounded-md border p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <Select value={selectedTicket.status} onValueChange={handleUpdateTicketStatus}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <Select value={selectedTicket.priority} onValueChange={handleUpdateTicketPriority}>
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span>{selectedTicket.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Assignee:</span>
                        <div className="flex items-center gap-2">
                          {selectedTicket.assignedTo ? (
                            <>
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={getAssigneeAvatar(selectedTicket.assignedTo) || ""}
                                  alt={getAssigneeName(selectedTicket.assignedTo)}
                                />
                                <AvatarFallback>{getAssigneeInitials(selectedTicket.assignedTo)}</AvatarFallback>
                              </Avatar>
                              <span>{getAssigneeName(selectedTicket.assignedTo)}</span>
                            </>
                          ) : (
                            <span className="text-muted-foreground">Unassigned</span>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => {
                              setIsAssignTicketOpen(true)
                              setSelectedStaffMember(selectedTicket.assignedTo)
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-3 w-3"
                            >
                              <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                            </svg>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    <div className="rounded-md border p-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Business:</span>
                        <span>{selectedTicket.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Contact:</span>
                        <span>{selectedTicket.contactName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email:</span>
                        <span>{selectedTicket.contactEmail}</span>
                      </div>
                    </div>
                  </div>

                  {selectedTicket.source === "Quote Submission" && selectedTicket.metadata && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Quote Details</h3>
                      <div className="rounded-md border p-4 space-y-3">
                        {selectedTicket.metadata.services && (
                          <div>
                            <span className="text-muted-foreground">Services:</span>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {selectedTicket.metadata.services.map((service: string, index: number) => (
                                <Badge key={index} variant="outline" className="font-normal">
                                  {service}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {selectedTicket.metadata.budget && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Budget:</span>
                            <span>{selectedTicket.metadata.budget}</span>
                          </div>
                        )}
                        {selectedTicket.metadata.timeline && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Timeline:</span>
                            <span>{selectedTicket.metadata.timeline}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <Button variant="outline" onClick={() => setIsTicketDetailOpen(false)}>
                  Close
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button onClick={() => handleUpdateTicketStatus("Resolved")}>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Resolve Ticket
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick View Modal */}
      <Dialog open={isQuickViewOpen} onOpenChange={setIsQuickViewOpen}>
        <DialogContent className="max-w-md">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>{selectedTicket.subject}</DialogTitle>
                  <div className="flex items-center gap-2">{getStatusBadge(selectedTicket.status)}</div>
                </div>
                <DialogDescription>
                  {selectedTicket.id} • {selectedTicket.businessName}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="rounded-md border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span>{selectedTicket.status}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Priority:</span>
                    <span>{selectedTicket.priority}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Assignee:</span>
                    <span>{getAssigneeName(selectedTicket.assignedTo)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created:</span>
                    <span>{selectedTicket.createdAt}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Latest Message</h4>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">
                        {selectedTicket.messages[selectedTicket.messages.length - 1].sender}
                      </span>
                      <span className="text-xs">
                        {selectedTicket.messages[selectedTicket.messages.length - 1].timestamp}
                      </span>
                    </div>
                    <p className="line-clamp-3">
                      {selectedTicket.messages[selectedTicket.messages.length - 1].content}
                    </p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setIsQuickViewOpen(false)
                    handleViewTicket(selectedTicket)
                  }}
                >
                  View Full Details
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Ticket Modal */}
      <Dialog open={isAssignTicketOpen} onOpenChange={setIsAssignTicketOpen}>
        <DialogContent className="max-w-md">
          {selectedTicket && (
            <>
              <DialogHeader>
                <DialogTitle>Assign Ticket</DialogTitle>
                <DialogDescription>Assign ticket {selectedTicket.id} to a support team member</DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="assignee">Assignee</Label>
                    <Select
                      value={selectedStaffMember?.toString() || ""}
                      onValueChange={(value) => setSelectedStaffMember(value ? Number.parseInt(value) : null)}
                    >
                      <SelectTrigger id="assignee">
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unassigned">Unassigned</SelectItem>
                        {supportStaff.map((staff) => (
                          <SelectItem key={staff.id} value={staff.id.toString()}>
                            {staff.name} ({staff.role})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Current Assignee:</span>
                      <span>{getAssigneeName(selectedTicket.assignedTo)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAssignTicketOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAssignTicket}>Assign Ticket</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Create Ticket Modal */}
      <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Ticket</DialogTitle>
            <DialogDescription>Create a new support ticket manually</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.ticketCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                id="business-name"
                value={newTicket.businessName}
                onChange={(e) => setNewTicket({ ...newTicket, businessName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input
                  id="contact-name"
                  value={newTicket.contactName}
                  onChange={(e) => setNewTicket({ ...newTicket, contactName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={newTicket.contactEmail}
                  onChange={(e) => setNewTicket({ ...newTicket, contactEmail: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={4}
                value={newTicket.message}
                onChange={(e) => setNewTicket({ ...newTicket, message: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTicket} disabled={!newTicket.subject || !newTicket.businessName}>
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings Modal */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Support Settings</DialogTitle>
            <DialogDescription>Configure support system settings and preferences</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">General Settings</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="auto-assign">Auto-Assign Tickets</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically assign new tickets to available support staff
                    </p>
                  </div>
                  <Switch
                    id="auto-assign"
                    checked={settings.autoAssignTickets}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoAssignTickets: checked })}
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email notifications for new tickets and responses
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.sendEmailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, sendEmailNotifications: checked })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-priority">Default Priority</Label>
                    <Select
                      value={settings.defaultPriority}
                      onValueChange={(value) => setSettings({ ...settings, defaultPriority: value })}
                    >
                      <SelectTrigger id="default-priority">
                        <SelectValue placeholder="Select default priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="auto-close">Auto-Close After (Days)</Label>
                    <Input
                      id="auto-close"
                      type="number"
                      min="1"
                      value={settings.autoCloseAfterDays}
                      onChange={(e) =>
                        setSettings({ ...settings, autoCloseAfterDays: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Ticket Categories</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div className="space-y-2">
                  <Label htmlFor="ticket-categories">Manage Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {settings.ticketCategories.map((category, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {category}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 rounded-full"
                          onClick={() => {
                            const newCategories = [...settings.ticketCategories]
                            newCategories.splice(index, 1)
                            setSettings({ ...settings, ticketCategories: newCategories })
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                          <span className="sr-only">Remove</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Input id="new-category" placeholder="New category name" className="flex-1" />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const input = document.getElementById("new-category") as HTMLInputElement
                        if (input.value.trim()) {
                          setSettings({
                            ...settings,
                            ticketCategories: [...settings.ticketCategories, input.value.trim()],
                          })
                          input.value = ""
                        }
                      }}
                    >
                      Add Category
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Automation Rules</h3>
              <div className="space-y-4 rounded-md border p-4">
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Auto-Escalate High Priority Tickets</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically notify managers of high priority tickets
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Follow-up Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Send reminders for tickets without activity for 24 hours
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <div className="space-y-0.5">
                    <Label>Auto-Tag Tickets</Label>
                    <p className="text-sm text-muted-foreground">Automatically tag tickets based on content</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSettings}>Save Settings</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
