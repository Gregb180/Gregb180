"use client"

import { Mail, Plus, Shield, Trash, User } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

export default function AdminAccessPage() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null)

  // Mock data for admin users
  const admins = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Super Admin",
      permissions: {
        viewBusinesses: true,
        manageSubscriptions: true,
        exportData: true,
        deleteAccounts: true,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Support Admin",
      permissions: {
        viewBusinesses: true,
        manageSubscriptions: false,
        exportData: true,
        deleteAccounts: false,
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Billing Admin",
      permissions: {
        viewBusinesses: true,
        manageSubscriptions: true,
        exportData: true,
        deleteAccounts: false,
      },
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Support Agent",
      permissions: {
        viewBusinesses: true,
        manageSubscriptions: false,
        exportData: false,
        deleteAccounts: false,
      },
    },
  ]

  const handleInviteAdmin = () => {
    setIsInviteModalOpen(true)
  }

  const handlePermissions = (admin: any) => {
    setSelectedAdmin(admin)
    setIsPermissionsModalOpen(true)
  }

  const handleDeleteAdmin = (admin: any) => {
    setSelectedAdmin(admin)
    setIsDeleteModalOpen(true)
  }

  const handleEmailAdmin = (admin: any) => {
    // In a real app, this would open an email interface
    alert(`Sending email to ${admin.email}`)
  }

  const handleEditProfile = (admin: any) => {
    setSelectedAdmin(admin)
    setIsEditProfileModalOpen(true)
  }

  const confirmInvite = () => {
    // In a real app, this would call an API to send an invitation
    alert("Invitation would be sent")
    setIsInviteModalOpen(false)
  }

  const confirmPermissionsUpdate = () => {
    // In a real app, this would call an API to update permissions
    alert(`Permissions for ${selectedAdmin.name} would be updated`)
    setIsPermissionsModalOpen(false)
  }

  const confirmDeleteAdmin = () => {
    // In a real app, this would call an API to delete the admin
    alert(`Admin ${selectedAdmin.name} would be deleted`)
    setIsDeleteModalOpen(false)
  }

  const confirmProfileUpdate = () => {
    // In a real app, this would call an API to update the admin profile
    alert(`Profile for ${selectedAdmin.name} would be updated`)
    setIsEditProfileModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Access</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleInviteAdmin}>
              <Plus className="mr-2 h-4 w-4" />
              Invite Admin Assistant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite Admin Assistant</DialogTitle>
              <DialogDescription>Send an invitation to a new admin assistant.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select>
                  <SelectTrigger id="role" className="col-span-3">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="support-admin">Support Admin</SelectItem>
                    <SelectItem value="billing-admin">Billing Admin</SelectItem>
                    <SelectItem value="support-agent">Support Agent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4">
                <h4 className="font-medium mb-2">Permissions</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="view-businesses">View Businesses</Label>
                    <Switch id="view-businesses" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="manage-subscriptions">Manage Subscriptions</Label>
                    <Switch id="manage-subscriptions" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="export-data">Export Data</Label>
                    <Switch id="export-data" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="delete-accounts">Delete Accounts</Label>
                    <Switch id="delete-accounts" />
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={confirmInvite}>
                Send Invitation
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Assistants</CardTitle>
          <CardDescription>Manage admin assistants and their permissions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {admin.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {admin.permissions.viewBusinesses && (
                          <Badge variant="secondary" className="font-normal">
                            View Businesses
                          </Badge>
                        )}
                        {admin.permissions.manageSubscriptions && (
                          <Badge variant="secondary" className="font-normal">
                            Manage Subscriptions
                          </Badge>
                        )}
                        {admin.permissions.exportData && (
                          <Badge variant="secondary" className="font-normal">
                            Export Data
                          </Badge>
                        )}
                        {admin.permissions.deleteAccounts && (
                          <Badge variant="secondary" className="font-normal">
                            Delete Accounts
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEmailAdmin(admin)}>
                          <Mail className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Email</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEditProfile(admin)}>
                          <User className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Edit Profile</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handlePermissions(admin)}>
                          <Shield className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">Permissions</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600"
                          onClick={() => handleDeleteAdmin(admin)}
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
      {/* Permissions Modal */}
      <Dialog open={isPermissionsModalOpen} onOpenChange={setIsPermissionsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Permissions</DialogTitle>
            <DialogDescription>Update permissions for {selectedAdmin?.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-view-businesses">View Businesses</Label>
                <Switch id="perm-view-businesses" defaultChecked={selectedAdmin?.permissions.viewBusinesses} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-manage-subscriptions">Manage Subscriptions</Label>
                <Switch
                  id="perm-manage-subscriptions"
                  defaultChecked={selectedAdmin?.permissions.manageSubscriptions}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-export-data">Export Data</Label>
                <Switch id="perm-export-data" defaultChecked={selectedAdmin?.permissions.exportData} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="perm-delete-accounts">Delete Accounts</Label>
                <Switch id="perm-delete-accounts" defaultChecked={selectedAdmin?.permissions.deleteAccounts} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPermissionsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmPermissionsUpdate}>Save Permissions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Admin Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admin</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedAdmin?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteAdmin}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Edit Profile Modal */}
      <Dialog open={isEditProfileModalOpen} onOpenChange={setIsEditProfileModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin Profile</DialogTitle>
            <DialogDescription>Update profile information for {selectedAdmin?.name}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input id="edit-name" className="col-span-3" defaultValue={selectedAdmin?.name} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input id="edit-email" type="email" className="col-span-3" defaultValue={selectedAdmin?.email} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-role" className="text-right">
                Role
              </Label>
              <Select defaultValue={selectedAdmin?.role?.toLowerCase().replace(" ", "-")}>
                <SelectTrigger id="edit-role" className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                  <SelectItem value="support-admin">Support Admin</SelectItem>
                  <SelectItem value="billing-admin">Billing Admin</SelectItem>
                  <SelectItem value="support-agent">Support Agent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditProfileModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmProfileUpdate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
