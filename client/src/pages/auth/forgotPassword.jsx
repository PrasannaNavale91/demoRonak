import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { forgotPasswordFormControls } from "@/config";
import { forgotPassword } from "@/store/auth-slice";
import { useDispatch, useParams } from "react-redux";
import CommonForm from "@/components/common/form";

const initialState = {
  email: "",
};

function AuthForgotPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { email } = useParams();

  async function onSubmit(event) {
    event.preventDefault();

    dispatch(forgotPassword(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });

        const email = data.payload.token;
        navigate(`/auth/verify-otp/${email}`);
      } else {
        toast({
          title: data?.payload?.message || "OTP request failed",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Forgot Your Password
        </h1>
        <p className="mt-2">Please enter your email address for password reset</p>
      </div>
      <CommonForm
        formControls={forgotPasswordFormControls}
        buttonText={"Request OTP"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthForgotPassword;