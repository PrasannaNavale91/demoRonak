import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState("otp");
  const { toast } = useToast();

  async function handleForgotPassword(e) {
    e.preventDefault();

    const endpoint =
      method === "otp" ? "/forgot-password" : "reset-password"

    try {
      const response = await axios.post(
        `${import.meta.env.CLIENT_URL}${endpoint}`,
        { email }
      );
      toast({ title: response.data.message, variant: "success" });
    } catch (error) {
      toast({ title: error.response?.data?.message, variant: "destructive" });
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
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
          <p
            className="w-full p-2 border rounded-lg"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            OTP via Email
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Send {method === "otp" ? "OTP" : "Reset Link"}
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;