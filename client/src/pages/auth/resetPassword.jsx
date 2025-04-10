import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordFormControls } from "@/config";
import { resetPassword } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";

const initialState = {
  password: "",
};

function AuthResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  async function onSubmit(event) {
    event.preventDefault();

    dispatch(resetPassword(formData)).then((data) => {
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
          Verify Otp
        </h1>
      </div>
      <CommonForm
        formControls={resetPasswordFormControls}
        buttonText={"Reset Password"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthResetPassword;