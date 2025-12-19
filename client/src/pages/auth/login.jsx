import CommonForm from "@/components/common/form";
import { loginControls } from "@/config";
import { loginUser } from "@/store/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault();
    console.log("Login form submitted", formData);
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast("Login successful");
      } else {
        console.log(data);
        toast.error(data?.payload?.message);
      }
    });
  }
  return (
    <div className="max-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-4">
          Login Here
        </h1>
        <CommonForm
          formControls={loginControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText={"Login"}
        />
        <p className="mt-2">
          Don't have an account?{" "}
          <Link
            className="font-medium ml-2text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
