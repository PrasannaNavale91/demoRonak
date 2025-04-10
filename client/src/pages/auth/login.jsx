import CommonForm from "@/components/common/form";
import { useToast } from "@/hooks/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    navigate("/auth/forgot-password");
  };

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        const role = data.payload?.user?.role;

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else{
          navigate("/shop/home");
        }

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
          Sign in to your account
        </h1>
        <p className="mt-2">Login to continue</p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      <div className="flex items-center justify-between">
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline text-sky-400"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
        <p className="mt-2">
          <button onClick={handleForgotPassword}>Forgot Password?</button>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;