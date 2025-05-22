"use client"

import { Edit, Plus, Trash } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

// Initial plans data
const initialPlans = [
  {
    id: 1,
    name: "Basic",
    price: "$99",
    subscribers: 28,
    features: ["10 Quotes/month", "Basic Templates", "Email Support"],
  },
  {
    id: 2,
    name: "Professional",
    price: "$299",
    subscribers: 42,
    features: ["50 Quotes/month", "Custom Templates", "Priority Support", "Analytics Dashboard"],
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$499",
    subscribers: 15,
    features: ["Unlimited Quotes", "Custom Branding", "API Access", "Priority Support", "Dedicated Account Manager"],
  },
]

// Calculate MRR
const calculateMRR = (plansArray: any[]) => {
  return plansArray.reduce((total, plan) => {
    const price = Number.parseInt(plan.price.replace("$", ""))
    return total + price * plan.subscribers
  }, 0)
}

export default function SubscriptionsPage() {
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState(false)
  const [isEditPlanModalOpen, setIsEditPlanModalOpen] = useState(false)
  const [isDeletePlanModalOpen, setIsDeletePlanModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [plans, setPlans] = useState(initialPlans)

  const [editFormData, setEditFormData] = useState({
    name: "",
    price: "",
    features: "",
  })

  const handleAddPlan = () => {
    setIsAddPlanModalOpen(true)
  }

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan)
    setEditFormData({
      name: plan.name,
      price: plan.price,
      features: plan.features.join("\n"),
    })
    setIsEditPlanModalOpen(true)
  }

  const handleDeletePlan = (plan: any) => {
    setSelectedPlan(plan)
    setIsDeletePlanModalOpen(true)
  }

  const confirmAddPlan = () => {
    // Get values from the form (in a real app, you'd have state for these)
    const nameInput = document.getElementById("name") as HTMLInputElement
    const priceInput = document.getElementById("price") as HTMLInputElement
    const featuresInput = document.getElementById("features") as HTMLTextAreaElement

    // Create new plan object
    const newPlan = {
      id: plans.length + 1,
      name: nameInput.value,
      price: priceInput.value,
      subscribers: 0, // New plans start with 0 subscribers
      features: featuresInput.value.split("\n").filter((feature) => feature.trim() !== ""),
    }

    // Add the new plan to the state
    setPlans([...plans, newPlan])

    // Show confirmation
    alert(`New plan "${newPlan.name}" has been added`)
    setIsAddPlanModalOpen(false)
  }

  const handleEditFormChange = (field: string, value: string) => {
    setEditFormData({
      ...editFormData,
      [field]: value,
    })
  }

  const confirmEditPlan = () => {
    // Create updated plan object
    const updatedPlan = {
      ...selectedPlan,
      name: editFormData.name,
      price: editFormData.price,
      features: editFormData.features.split("\n").filter((feature) => feature.trim() !== ""),
    }

    // Update the plans state with the edited plan
    const updatedPlans = plans.map((plan) => (plan.id === selectedPlan.id ? updatedPlan : plan))

    // Update the state
    setPlans(updatedPlans)

    // Show confirmation
    alert(`Plan ${editFormData.name} has been updated`)
    setIsEditPlanModalOpen(false)
  }

  const confirmDeletePlan = () => {
    // Filter out the deleted plan
    const updatedPlans = plans.filter((plan) => plan.id !== selectedPlan.id)

    // Update the state
    setPlans(updatedPlans)

    // Show confirmation
    alert(`Plan ${selectedPlan.name} has been deleted`)
    setIsDeletePlanModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleAddPlan}>
              <Plus className="mr-2 h-4 w-4" />
              Add Plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Subscription Plan</DialogTitle>
              <DialogDescription>Create a new subscription plan for your customers.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Plan Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Monthly Price
                </Label>
                <Input id="price" className="col-span-3" placeholder="$0.00" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="features" className="text-right">
                  Features
                </Label>
                <Textarea id="features" className="col-span-3" placeholder="One feature per line" rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={confirmAddPlan}>
                Save Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Monthly Recurring Revenue</CardTitle>
            <CardDescription>Total MRR across all plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${calculateMRR(plans).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Subscribers</CardTitle>
            <CardDescription>Active subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{plans.reduce((total, plan) => total + plan.subscribers, 0)}</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Average Revenue Per User</CardTitle>
            <CardDescription>ARPU across all plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${Math.round(calculateMRR(plans) / plans.reduce((total, plan) => total + plan.subscribers, 0))}
            </div>
            <p className="text-xs text-muted-foreground">+3.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Manage your subscription plans and pricing.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan Name</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Subscribers</TableHead>
                  <TableHead>Features</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {plans.map((plan) => (
                  <TableRow key={plan.id}>
                    <TableCell className="font-medium">{plan.name}</TableCell>
                    <TableCell>{plan.price}</TableCell>
                    <TableCell>{plan.subscribers}</TableCell>
                    <TableCell>
                      <ul className="list-disc pl-5">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm">
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell>
                      ${(Number.parseInt(plan.price.replace("$", "")) * plan.subscribers).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeletePlan(plan)}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {/* Edit Plan Modal */}
      <Dialog open={isEditPlanModalOpen} onOpenChange={setIsEditPlanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscription Plan</DialogTitle>
            <DialogDescription>Update the details for {selectedPlan?.name} plan.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Plan Name
              </Label>
              <Input
                id="edit-name"
                className="col-span-3"
                value={editFormData.name}
                onChange={(e) => handleEditFormChange("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right">
                Monthly Price
              </Label>
              <Input
                id="edit-price"
                className="col-span-3"
                value={editFormData.price}
                onChange={(e) => handleEditFormChange("price", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-features" className="text-right">
                Features
              </Label>
              <Textarea
                id="edit-features"
                className="col-span-3"
                value={editFormData.features}
                onChange={(e) => handleEditFormChange("features", e.target.value)}
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={confirmEditPlan}>
              Update Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Plan Confirmation Modal */}
      <Dialog open={isDeletePlanModalOpen} onOpenChange={setIsDeletePlanModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Plan</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the {selectedPlan?.name} plan? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeletePlanModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeletePlan}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
