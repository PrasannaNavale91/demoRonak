import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyOtpFormControls } from "@/config";
import { verifyOtp } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";

const initialState = {
  email: "",
  otp: "",
  password: "",
};

function VerifyOtp() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleVerifyOtp(event) {
    event.preventDefault();

    dispatch(verifyOtp(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Otp & Reset Password
        </h1>
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

export default VerifyOtp;