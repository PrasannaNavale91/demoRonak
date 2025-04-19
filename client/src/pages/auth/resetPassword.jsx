import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { resetPasswordFormControls } from "@/config";
import { resetPassword } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  newPassword: "",
  confirmPassword: "",
};

function AuthResetPassword() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { token } = useParams();
  const navigate = useNavigate();
  const decodedToken = decodeURIComponent(token);
  
  async function onSubmit(event) {
    event.preventDefault();

    dispatch(resetPassword({ token: decodedToken, newPassword: formData.newPassword })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });

        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message || "Password reset failed",
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Reset your Password
        </h1>
        <p className="mt-2">Please enter your new password below</p>
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