import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TPackageProps } from "@/types/common.data";

const MannualPayment: React.FC<TPackageProps> = ({ service }) => {
  // State to track form data
  const [formData, setFormData] = useState({
    paymentMethod: "",
    phoneNumber: "",
    transactionId: "",
    payableAmount: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({
    paymentMethod: "",
    phoneNumber: "",
    transactionId: "",
    payableAmount: "",
  });

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when input is filled
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle select change
  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }));

    // Clear error when input is filled
    setErrors((prev) => ({ ...prev, paymentMethod: "" }));
  };

  // Validate form inputs
  const validate = () => {
    const newErrors: typeof errors = {
      paymentMethod: "",
      phoneNumber: "",
      transactionId: "",
      payableAmount: "",
    };

    if (!formData.paymentMethod)
      newErrors.paymentMethod = "Payment method is required.";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone number is required.";
    if (!formData.transactionId)
      newErrors.transactionId = "Transaction ID is required.";
    if (!formData.payableAmount)
      newErrors.payableAmount = "Payable amount is required.";

    setErrors(newErrors);

    // Return true if no errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Submit form data to backend
  const handleSubmit = async () => {
    if (!validate()) return; // Stop submission if validation fails

    // Add additional data to the payload
    const payload = {
      ...formData,
      packageType: service.packageType,
      serviceId: service._id,
    };

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Payment request submitted successfully");
      } else {
        console.error("Failed to submit payment request");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border border-gray-800 p-4 mt-5 rounded-lg">
      <div>
        <label htmlFor="paymentmethod">Payment Method</label>
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger className="h-[40px] border-gray-800">
            <SelectValue placeholder="Choose Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Method</SelectLabel>
              <SelectItem value="bkash">01966382620(Bkash-Personal)</SelectItem>
              <SelectItem value="nagadh">
                01966382620(Nagad-Personal)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.paymentMethod && (
          <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
        )}
      </div>
      <div className="my-3">
        <Label htmlFor="phoneNumber">Bkash / Nagad No.</Label>
        <Input
          type="text"
          name="phoneNumber"
          autoComplete="off"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter Reference Mobile Number"
          required
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
        )}
      </div>
      <div>
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input
          type="text"
          name="transactionId"
          value={formData.transactionId}
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter Transaction ID"
          required
        />
        {errors.transactionId && (
          <p className="text-red-500 text-sm">{errors.transactionId}</p>
        )}
      </div>
      <div className="my-3">
        <Label htmlFor="payableAmount">Payable Amount</Label>
        <Input
          type="text"
          name="payableAmount"
          value={formData.payableAmount}
          onChange={handleInputChange}
          className="h-[40px] border-gray-800"
          placeholder="Enter the Amount Paid."
          required
        />
        {errors.payableAmount && (
          <p className="text-red-500 text-sm">{errors.payableAmount}</p>
        )}
      </div>
      <div>
        <Button
          className="bg-BgPrimary hover:bg-BgPrimaryHover"
          onClick={handleSubmit}
        >
          Submit Activation Request
        </Button>
      </div>
    </div>
  );
};

export default MannualPayment;
