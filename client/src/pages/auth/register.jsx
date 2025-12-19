import CommonForm from "@/components/common/form";
import { Link, useNavigate } from "react-router-dom";
import { registerFormControles } from "@/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/authSlice";
import { toast } from "sonner";
function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const buttonText = "Signup";
  function onSubmit(e) {
    e.preventDefault();
    console.log("Register form submitted", formData);
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast("registered successfully");
        navigate("/auth/login");
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
          Create an account
        </h1>
        <CommonForm
          formControls={registerFormControles}
          onSubmit={onSubmit}
          buttonText={buttonText}
          formData={formData}
          setFormData={setFormData}
        />
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            className="font-medium ml-2text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
