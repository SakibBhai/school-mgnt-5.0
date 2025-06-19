"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, Bell, Mail, Save, Key, DollarSign, AlertTriangle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function FeesSettingsPage() {
  const [settings, setSettings] = useState({
    // Payment Gateway Settings
    paymentGateway: "razorpay",
    merchantId: "",
    apiKey: "",
    secretKey: "",
    webhookUrl: "",
    testMode: true,

    // Fee Settings
    currency: "INR",
    lateFeePercentage: "5",
    gracePeriodDays: "7",
    autoGenerateInvoices: true,
    invoicePrefix: "INV",

    // Notification Settings
    emailNotifications: true,
    smsNotifications: false,
    reminderDays: "3",
    overdueReminderDays: "7",

    // Security Settings
    encryptPaymentData: true,
    requireOTP: false,
    sessionTimeout: "30",

    // Email Templates
    invoiceEmailSubject: "Invoice for Fee Payment",
    reminderEmailSubject: "Payment Reminder",
    confirmationEmailSubject: "Payment Confirmation",
  })

  const handleSaveSettings = () => {
    // Validate required fields
    if (settings.paymentGateway && !settings.merchantId) {
      toast.error("Merchant ID is required for the selected payment gateway")
      return
    }

    toast.success("Settings saved successfully")
  }

  const handleTestConnection = () => {
    toast.success("Payment gateway connection test successful")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fees & Payments Settings</h1>
          <p className="text-muted-foreground">
            Configure payment gateways, fee structures, and notification preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="payment-gateway" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payment-gateway">Payment Gateway</TabsTrigger>
          <TabsTrigger value="fee-settings">Fee Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
        </TabsList>

        {/* Payment Gateway Settings */}
        <TabsContent value="payment-gateway" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Gateway Configuration
              </CardTitle>
              <CardDescription>Configure your payment gateway settings for secure online payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="payment-gateway">Payment Gateway</Label>
                  <Select
                    value={settings.paymentGateway}
                    onValueChange={(value) => setSettings({ ...settings, paymentGateway: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment gateway" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bkash">bKash</SelectItem>
                      <SelectItem value="nagad">Nagad</SelectItem>
                      <SelectItem value="rocket">Rocket</SelectItem>
                      <SelectItem value="upay">Upay</SelectItem>
                      <SelectItem value="sslcommerz">SSLCommerz</SelectItem>
                      <SelectItem value="aamarpay">aamarPay</SelectItem>
                      <SelectItem value="razorpay">Razorpay</SelectItem>
                      <SelectItem value="stripe">Stripe</SelectItem>
                      <SelectItem value="payu">PayU</SelectItem>
                      <SelectItem value="ccavenue">CCAvenue</SelectItem>
                      <SelectItem value="paytm">Paytm</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="merchant-id">Merchant ID *</Label>
                    <Input
                      id="merchant-id"
                      type="password"
                      placeholder="Enter merchant ID"
                      value={settings.merchantId}
                      onChange={(e) => setSettings({ ...settings, merchantId: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key *</Label>
                    <Input
                      id="api-key"
                      type="password"
                      placeholder="Enter API key"
                      value={settings.apiKey}
                      onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="secret-key">Secret Key *</Label>
                    <Input
                      id="secret-key"
                      type="password"
                      placeholder="Enter secret key"
                      value={settings.secretKey}
                      onChange={(e) => setSettings({ ...settings, secretKey: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://yourschool.com/webhook"
                      value={settings.webhookUrl}
                      onChange={(e) => setSettings({ ...settings, webhookUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="test-mode"
                    checked={settings.testMode}
                    onCheckedChange={(checked) => setSettings({ ...settings, testMode: checked })}
                  />
                  <Label htmlFor="test-mode">Test Mode</Label>
                  <span className="text-sm text-muted-foreground">(Enable for testing, disable for live payments)</span>
                </div>

                <Separator />

                <div className="flex items-center space-x-2">
                  <Button variant="outline" onClick={handleTestConnection}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Test Connection
                  </Button>
                  <div className="text-sm text-muted-foreground">Test your payment gateway configuration</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Supported Payment Methods</CardTitle>
              <CardDescription>Configure which payment methods are available to users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: "bkash", label: "bKash", enabled: true },
                  { id: "nagad", label: "Nagad", enabled: true },
                  { id: "rocket", label: "Rocket", enabled: true },
                  { id: "upay", label: "Upay", enabled: false },
                  { id: "credit-card", label: "Credit Cards", enabled: true },
                  { id: "debit-card", label: "Debit Cards", enabled: true },
                  { id: "net-banking", label: "Net Banking", enabled: true },
                  { id: "bank-transfer", label: "Bank Transfer", enabled: true },
                  { id: "cash", label: "Cash Payment", enabled: true },
                ].map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <Switch defaultChecked={method.enabled} />
                    <Label className="text-sm">{method.label}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Settings */}
        <TabsContent value="fee-settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Fee Configuration
              </CardTitle>
              <CardDescription>Configure fee structures, late fees, and invoice settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={settings.currency}
                    onValueChange={(value) => setSettings({ ...settings, currency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">Bangladesh Taka (৳)</SelectItem>
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                  <Input
                    id="invoice-prefix"
                    placeholder="INV"
                    value={settings.invoicePrefix}
                    onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="late-fee">Late Fee Percentage (%)</Label>
                  <Input
                    id="late-fee"
                    type="number"
                    placeholder="5"
                    value={settings.lateFeePercentage}
                    onChange={(e) => setSettings({ ...settings, lateFeePercentage: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grace-period">Grace Period (Days)</Label>
                  <Input
                    id="grace-period"
                    type="number"
                    placeholder="7"
                    value={settings.gracePeriodDays}
                    onChange={(e) => setSettings({ ...settings, gracePeriodDays: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-generate"
                  checked={settings.autoGenerateInvoices}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoGenerateInvoices: checked })}
                />
                <Label htmlFor="auto-generate">Auto-generate invoices</Label>
                <span className="text-sm text-muted-foreground">Automatically create invoices when fees are due</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Academic Year Settings</CardTitle>
              <CardDescription>Configure academic year and fee collection periods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="academic-year-start">Academic Year Start</Label>
                  <Input id="academic-year-start" type="date" defaultValue="2024-04-01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="academic-year-end">Academic Year End</Label>
                  <Input id="academic-year-end" type="date" defaultValue="2025-03-31" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fee-collection-months">Fee Collection Months</Label>
                <Select defaultValue="10">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Months (Apr-Jan)</SelectItem>
                    <SelectItem value="12">12 Months (Apr-Mar)</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure automated notifications and reminders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send email notifications for payments and reminders
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>SMS Notifications</Label>
                    <div className="text-sm text-muted-foreground">Send SMS notifications for important updates</div>
                  </div>
                  <Switch
                    checked={settings.smsNotifications}
                    onCheckedChange={(checked) => setSettings({ ...settings, smsNotifications: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reminder-days">Payment Reminder (Days Before Due)</Label>
                  <Input
                    id="reminder-days"
                    type="number"
                    placeholder="3"
                    value={settings.reminderDays}
                    onChange={(e) => setSettings({ ...settings, reminderDays: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overdue-reminder">Overdue Reminder (Days After Due)</Label>
                  <Input
                    id="overdue-reminder"
                    type="number"
                    placeholder="7"
                    value={settings.overdueReminderDays}
                    onChange={(e) => setSettings({ ...settings, overdueReminderDays: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Recipients</CardTitle>
              <CardDescription>Configure who receives different types of notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Invoice Generated", recipients: ["Parents", "Students"], enabled: true },
                  { type: "Payment Received", recipients: ["Parents", "Admin"], enabled: true },
                  { type: "Payment Reminder", recipients: ["Parents"], enabled: true },
                  { type: "Overdue Notice", recipients: ["Parents", "Admin"], enabled: true },
                  { type: "Payment Failed", recipients: ["Parents", "Admin"], enabled: true },
                ].map((notification, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{notification.type}</div>
                      <div className="text-sm text-muted-foreground">
                        Recipients: {notification.recipients.join(", ")}
                      </div>
                    </div>
                    <Switch defaultChecked={notification.enabled} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security measures for payment processing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Encrypt Payment Data</Label>
                    <div className="text-sm text-muted-foreground">
                      Encrypt sensitive payment information in database
                    </div>
                  </div>
                  <Switch
                    checked={settings.encryptPaymentData}
                    onCheckedChange={(checked) => setSettings({ ...settings, encryptPaymentData: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Require OTP for Payments</Label>
                    <div className="text-sm text-muted-foreground">
                      Require OTP verification for payment transactions
                    </div>
                  </div>
                  <Switch
                    checked={settings.requireOTP}
                    onCheckedChange={(checked) => setSettings({ ...settings, requireOTP: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (Minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  placeholder="30"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({ ...settings, sessionTimeout: e.target.value })}
                />
                <div className="text-sm text-muted-foreground">
                  Automatically log out users after specified minutes of inactivity
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance & Audit</CardTitle>
              <CardDescription>Security compliance and audit trail settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800">PCI DSS Compliance</div>
                    <div className="text-sm text-green-600">Payment processing meets PCI DSS standards</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Key className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800">SSL Encryption</div>
                    <div className="text-sm text-blue-600">All data transmission is encrypted with SSL/TLS</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="font-medium text-yellow-800">Audit Trail</div>
                    <div className="text-sm text-yellow-600">
                      All payment transactions are logged for audit purposes
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates */}
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Templates
              </CardTitle>
              <CardDescription>Customize email templates for different notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice-subject">Invoice Email Subject</Label>
                  <Input
                    id="invoice-subject"
                    placeholder="Invoice for Fee Payment"
                    value={settings.invoiceEmailSubject}
                    onChange={(e) => setSettings({ ...settings, invoiceEmailSubject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reminder-subject">Reminder Email Subject</Label>
                  <Input
                    id="reminder-subject"
                    placeholder="Payment Reminder"
                    value={settings.reminderEmailSubject}
                    onChange={(e) => setSettings({ ...settings, reminderEmailSubject: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmation-subject">Confirmation Email Subject</Label>
                  <Input
                    id="confirmation-subject"
                    placeholder="Payment Confirmation"
                    value={settings.confirmationEmailSubject}
                    onChange={(e) => setSettings({ ...settings, confirmationEmailSubject: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label>Available Variables</Label>
                  <div className="text-sm text-muted-foreground mt-1">Use these variables in your email templates:</div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {[
                      "{{student_name}}",
                      "{{parent_name}}",
                      "{{invoice_number}}",
                      "{{amount}}",
                      "{{due_date}}",
                      "{{school_name}}",
                      "{{payment_link}}",
                      "{{contact_email}}",
                      "{{contact_phone}}",
                    ].map((variable) => (
                      <code key={variable} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {variable}
                      </code>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>Preview how your email templates will look</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="text-sm text-muted-foreground mb-2">Sample Invoice Email:</div>
                <div className="bg-white p-4 rounded border">
                  <div className="font-medium mb-2">Subject: {settings.invoiceEmailSubject}</div>
                  <div className="text-sm space-y-2">
                    <p>Dear John Doe,</p>
                    <p>
                      This is to inform you that the fee invoice for your ward has been generated. Please find the
                      details below:
                    </p>
                    <div className="bg-gray-50 p-3 rounded">
                      <div>Invoice Number: INV-2024-001</div>
                      <div>Amount: ₹15,000</div>
                      <div>Due Date: January 31, 2024</div>
                    </div>
                    <p>Please make the payment before the due date to avoid late fees.</p>
                    <p>
                      Best regards,
                      <br />
                      EduManage Pro
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
