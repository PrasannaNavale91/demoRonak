import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { verifyOtpFormControls } from "@/config";
import { verifyOtp } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import CommonForm from "@/components/common/form";
import { useNavigate, useParams } from "react-router-dom";

const initialState = {
  otp: "",
};

function AuthVerifyOtp() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { email } = useParams();
  const navigate = useNavigate();
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const countdown = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const formatTime = () => {
    const mins = Math.floor(timer / 60);
    const secs = timer % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  async function onSubmit(event) {
    event.preventDefault();

    dispatch(verifyOtp({ email, otp: formData.otp })).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
        });

        navigate(`/auth/reset-password/${data.payload.token}`);
      } else {
        toast({
          title: data?.payload?.message || "Invalid OTP or OTP expired",
          variant: "destructive",
        });
      }
    });
  }

  const resendOTP = async () => {
    setTimer(120);
    setCanResend(false);
    try {
      const data = await dispatch(sendOtp({ email }));
  
      if (data?.payload?.success) {
        toast({
          title: "OTP sent again successfully!",
        });
      } else {
        toast({
          title: data?.payload?.message || "Failed to resend OTP",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Verify Your Otp
        </h1>
      </div>
      <CommonForm
        formControls={verifyOtpFormControls}
        buttonText={"Verify OTP"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="text-center">
        {canResend ? (
          <button onClick={resendOTP} className="text-sky-400 underline">
            Resend OTP
          </button>
        ) : (
          <p>Resend available in <strong>{formatTime()}</strong></p>
        )}
      </div>
    </div>
  );
}

export default AuthVerifyOtp;