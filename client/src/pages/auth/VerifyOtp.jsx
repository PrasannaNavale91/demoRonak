import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { toast } = useToast();

  async function handleVerifyOtp(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.CLIENT_URL}/auth/verify-otp`,
        { email, otp, newPassword }
      );

      toast({ title: response.data.message, variant: "success" });
    } catch (error) {
      toast({ title: error.response?.data?.message, variant: "destructive" });
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={handleVerifyOtp}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email Address</label>
          <input
            type="email"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">OTP</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded-lg"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
        >
          Verify OTP & Reset Password
        </button>
      </form>
    </div>
  );
}

export default VerifyOtp;