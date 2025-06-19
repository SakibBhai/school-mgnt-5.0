"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Smartphone, CreditCard, Building, Shield, CheckCircle } from "lucide-react"
import { formatCurrency } from "@/utils/currency"
import { toast } from "sonner"

interface BDTPaymentGatewayProps {
  amount: number
  studentName: string
  feeType: string
  onPaymentComplete: (result: { success: boolean; transactionId?: string; method: string }) => void
}

export function BDTPaymentGateway({ amount, studentName, feeType, onPaymentComplete }: BDTPaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    mobileNumber: "",
    pin: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    bankAccount: "",
  })

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error("Please select a payment method")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate
      const transactionId = `TXN${Date.now()}`

      setIsProcessing(false)

      if (success) {
        toast.success("Payment completed successfully!")
        onPaymentComplete({ success: true, transactionId, method: selectedMethod })
      } else {
        toast.error("Payment failed. Please try again.")
        onPaymentComplete({ success: false, method: selectedMethod })
      }
    }, 3000)
  }

  const renderPaymentForm = () => {
    switch (selectedMethod) {
      case "bkash":
      case "nagad":
      case "rocket":
      case "upay":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mobile-number">Mobile Number</Label>
              <Input
                id="mobile-number"
                placeholder="01XXXXXXXXX"
                value={paymentDetails.mobileNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, mobileNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="Enter your PIN"
                value={paymentDetails.pin}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, pin: e.target.value })}
              />
            </div>
          </div>
        )

      case "credit-card":
      case "debit-card":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardholder-name">Cardholder Name</Label>
              <Input
                id="cardholder-name"
                placeholder="John Doe"
                value={paymentDetails.cardholderName}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, cardholderName: e.target.value })}
              />
            </div>
          </div>
        )

      case "bank-transfer":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank-account">Bank Account Number</Label>
              <Input
                id="bank-account"
                placeholder="Enter your bank account number"
                value={paymentDetails.bankAccount}
                onChange={(e) => setPaymentDetails({ ...paymentDetails, bankAccount: e.target.value })}
              />
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="text-sm text-blue-800">
                <strong>Bank Details:</strong>
                <br />
                Account Name: EduManage Pro School
                <br />
                Account Number: 1234567890
                <br />
                Bank: Dutch-Bangla Bank Limited
                <br />
                Branch: Dhanmondi, Dhaka
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Secure Payment - BDT
        </CardTitle>
        <CardDescription>Complete your payment securely using Bangladesh payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Summary */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground">Student</div>
              <div className="font-medium">{studentName}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Fee Type</div>
              <div className="font-medium">{feeType}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="text-xl font-bold text-green-600">{formatCurrency(amount, "BDT")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Currency</div>
              <div className="font-medium">Bangladesh Taka (BDT)</div>
            </div>
          </div>
        </div>

        {/* Payment Method Selection */}
        <Tabs defaultValue="mobile-banking" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="mobile-banking">Mobile Banking</TabsTrigger>
            <TabsTrigger value="cards">Cards</TabsTrigger>
            <TabsTrigger value="bank-transfer">Bank Transfer</TabsTrigger>
          </TabsList>

          {/* Mobile Banking */}
          <TabsContent value="mobile-banking" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { id: "bkash", name: "bKash", icon: Smartphone, color: "bg-pink-100 border-pink-300" },
                { id: "nagad", name: "Nagad", icon: Smartphone, color: "bg-orange-100 border-orange-300" },
                { id: "rocket", name: "Rocket", icon: Smartphone, color: "bg-purple-100 border-purple-300" },
                { id: "upay", name: "Upay", icon: Smartphone, color: "bg-blue-100 border-blue-300" },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : `${method.color} hover:border-gray-400`
                  }`}
                >
                  <method.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium text-sm">{method.name}</div>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Cards */}
          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "credit-card", name: "Credit Card", icon: CreditCard },
                { id: "debit-card", name: "Debit Card", icon: CreditCard },
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-4 border-2 rounded-lg text-center transition-all ${
                    selectedMethod === method.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <method.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="font-medium text-sm">{method.name}</div>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Bank Transfer */}
          <TabsContent value="bank-transfer" className="space-y-4">
            <button
              onClick={() => setSelectedMethod("bank-transfer")}
              className={`w-full p-4 border-2 rounded-lg text-center transition-all ${
                selectedMethod === "bank-transfer"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Building className="h-6 w-6 mx-auto mb-2" />
              <div className="font-medium text-sm">Bank Transfer</div>
            </button>
          </TabsContent>
        </Tabs>

        {/* Payment Form */}
        {selectedMethod && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-green-50 border-green-300 text-green-700">
                <CheckCircle className="h-3 w-3 mr-1" />
                Secure Payment
              </Badge>
              <span className="text-sm text-muted-foreground">Your payment is protected by 256-bit SSL encryption</span>
            </div>

            {renderPaymentForm()}

            <Button onClick={handlePayment} disabled={isProcessing} className="w-full" size="lg">
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Processing Payment...
                </>
              ) : (
                <>Pay {formatCurrency(amount, "BDT")}</>
              )}
            </Button>

            <div className="text-xs text-center text-muted-foreground">
              By proceeding, you agree to our terms and conditions. This payment is processed securely through our
              certified payment partners.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
