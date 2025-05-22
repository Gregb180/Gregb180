"use client"

import { useState } from "react"
import { Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [features, setFeatures] = useState({
    imageUploads: true,
    quoteLimits: true,
    customBranding: true,
    apiAccess: false,
    webhooks: false,
  })

  const [notice, setNotice] = useState({
    enabled: false,
    message: "System maintenance scheduled for Sunday, May 10th from 2:00 AM to 4:00 AM UTC.",
    type: "info",
  })

  const [legalLinks, setLegalLinks] = useState({
    termsOfService: "https://example.com/terms",
    privacyPolicy: "https://example.com/privacy",
    cookiePolicy: "https://example.com/cookies",
  })

  const [supportContact, setSupportContact] = useState({
    email: "support@quotegen.example.com",
    phone: "+1 (555) 123-4567",
    hours: "Monday-Friday, 9:00 AM - 5:00 PM EST",
  })

  const handleSaveFeatures = () => {
    // In a real app, this would call an API to save the features
    alert("Feature settings saved successfully")
  }

  const handleSaveNotice = () => {
    // In a real app, this would call an API to save the notice
    alert("System notice saved successfully")
  }

  const handleUpdateLinks = () => {
    // In a real app, this would call an API to update the links
    alert("Legal links updated successfully")
  }

  const handleUpdateContactInfo = () => {
    // In a real app, this would call an API to update the contact info
    alert("Support contact information updated successfully")
  }

  const handleSaveAllChanges = () => {
    // In a real app, this would call an API to save all changes
    alert("All settings saved successfully")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Platform Settings</h1>
        <Button onClick={handleSaveAllChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="features">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="notices">System Notices</TabsTrigger>
          <TabsTrigger value="legal">Legal Links</TabsTrigger>
          <TabsTrigger value="support">Support Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="features" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable platform-wide features.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="image-uploads">Image Uploads</Label>
                  <p className="text-sm text-muted-foreground">Allow businesses to upload images for their quotes.</p>
                </div>
                <Switch
                  id="image-uploads"
                  checked={features.imageUploads}
                  onCheckedChange={(checked) => setFeatures({ ...features, imageUploads: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="quote-limits">Quote Limits</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce quote generation limits based on subscription plans.
                  </p>
                </div>
                <Switch
                  id="quote-limits"
                  checked={features.quoteLimits}
                  onCheckedChange={(checked) => setFeatures({ ...features, quoteLimits: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="custom-branding">Custom Branding</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow businesses to customize the look and feel of their quotes.
                  </p>
                </div>
                <Switch
                  id="custom-branding"
                  checked={features.customBranding}
                  onCheckedChange={(checked) => setFeatures({ ...features, customBranding: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access">API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable API access for businesses with Enterprise plans.
                  </p>
                </div>
                <Switch
                  id="api-access"
                  checked={features.apiAccess}
                  onCheckedChange={(checked) => setFeatures({ ...features, apiAccess: checked })}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="webhooks">Webhooks</Label>
                  <p className="text-sm text-muted-foreground">Allow businesses to set up webhooks for quote events.</p>
                </div>
                <Switch
                  id="webhooks"
                  checked={features.webhooks}
                  onCheckedChange={(checked) => setFeatures({ ...features, webhooks: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notices" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>System Notices</CardTitle>
              <CardDescription>Add platform-wide notices to inform users about important updates.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <div className="space-y-0.5">
                  <Label htmlFor="notice-enabled">Enable System Notice</Label>
                  <p className="text-sm text-muted-foreground">Display a notice banner to all users.</p>
                </div>
                <Switch
                  id="notice-enabled"
                  checked={notice.enabled}
                  onCheckedChange={(checked) => setNotice({ ...notice, enabled: checked })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notice-message">Notice Message</Label>
                <Textarea
                  id="notice-message"
                  value={notice.message}
                  onChange={(e) => setNotice({ ...notice, message: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notice-type">Notice Type</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={notice.type === "info" ? "default" : "outline"}
                    onClick={() => setNotice({ ...notice, type: "info" })}
                  >
                    Info
                  </Button>
                  <Button
                    variant={notice.type === "warning" ? "default" : "outline"}
                    onClick={() => setNotice({ ...notice, type: "warning" })}
                  >
                    Warning
                  </Button>
                  <Button
                    variant={notice.type === "error" ? "default" : "outline"}
                    onClick={() => setNotice({ ...notice, type: "error" })}
                  >
                    Error
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleSaveNotice}>
                Save Notice
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Legal Links</CardTitle>
              <CardDescription>Update links to legal documents displayed throughout the platform.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="terms-of-service">Terms of Service URL</Label>
                <Input
                  id="terms-of-service"
                  value={legalLinks.termsOfService}
                  onChange={(e) => setLegalLinks({ ...legalLinks, termsOfService: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="privacy-policy">Privacy Policy URL</Label>
                <Input
                  id="privacy-policy"
                  value={legalLinks.privacyPolicy}
                  onChange={(e) => setLegalLinks({ ...legalLinks, privacyPolicy: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cookie-policy">Cookie Policy URL</Label>
                <Input
                  id="cookie-policy"
                  value={legalLinks.cookiePolicy}
                  onChange={(e) => setLegalLinks({ ...legalLinks, cookiePolicy: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto" onClick={handleUpdateLinks}>
                Update Links
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Support Contact Information</CardTitle>
              <CardDescription>Update support contact information displayed to users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="support-email">Support Email</Label>
                <Input
                  id="support-email"
                  type="email"
                  value={supportContact.email}
                  onChange={(e) => setSupportContact({ ...supportContact, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-phone">Support Phone</Label>
                <Input
                  id="support-phone"
                  value={supportContact.phone}
                  onChange={(e) => setSupportContact({ ...supportContact, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="support-hours">Support Hours</Label>
                <Input
                  id="support-hours"
                  value={supportContact.hours}
                  onChange={(e) => setSupportContact({ ...supportContact, hours: e.target.value })}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateContactInfo}>Update Contact Info</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
