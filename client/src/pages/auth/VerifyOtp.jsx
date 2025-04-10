import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyOtpFormControls } from "@/config";
import { verifyOtp } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { useParams } from "react-router-dom";

const initialState = {
  opt: "",
};

function AuthVerifyOtp() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { token } = useParams();

  async function onSubmit(event) {
    event.preventDefault();

    dispatch(verifyOtp( token, otp )).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });

        navigate(`/auth/reset-password/${token}`);
      } else {
        toast({
          title: data?.payload?.message || "Invalid OTP or OTP expired",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Your Otp
        </h1>
        <p className="mt-2">Enter your opt within 1 minute</p>
      </div>
      <CommonForm
        formControls={verifyOtpFormControls}
        buttonText={"Verify OTP"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthVerifyOtp;