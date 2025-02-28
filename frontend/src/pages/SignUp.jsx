import React, { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  User,
  Lock,
  EyeOff,
  Eye,
  Loader2,
  Phone,
} from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [emailVerify, setEmailVerify] = useState(false);
  const [buttonText, setButtonText] = useState("Verify");
  const [btnColour, setBtnColour] = useState(false);
  const [btnColour2, setBtnColour2] = useState(false);

  const emailInput = useRef();
  const otp = 123456;

  const { isSigningUp, signUp, verifyEmails, emailOTP } = useAuthStore();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // verifying the email
  const verifyEmail = () => {
    setEmailVerify(true);
    let email = formData.email;
    verifyEmails(email);
  };

  // validating the user inputs
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    if (!emailRegex.test(formData.email))
      return toast.error("Invalid email formate");
    if (!formData.password) return toast.error("password is required");
    if (!passwordRegex.test(formData.password))
      return toast.error(
        "Password must be at least 6 characters and include uppercase, lowercase, a number, and a special character."
      );
    console.log(formData);

    return true;
  };

  // handaling the submission
  const handelSubmit = (e) => {
    e.preventDefault();
    const succsess = validateForm();
    if (succsess === true  && buttonText === "verified" ) {
      signUp(formData);
    }
    else{
      toast.error('verification is required')
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2  ">
      {/* -------------------------------------left-------------------------------------------- */}
      <div className="flex flex-col items-center p-6   sm:p-12 ">
        <div className="w-full max-w-md space-y-8  items-center ">
          {/* logo */}
          <div className="text-center mt-14 mb-8 ">
            <div className="flex flex-col gap-2 group items-center">
              <div
                className="size-12 rounded-xl bg-primary/10 flex items-center
               justify-center group-hover:bg-primary/20 transition-colors"
              >
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-1">Create Account</h1>
              <p className="text-base-content/60">
                Get stated with your free account
              </p>
            </div>
          </div>
          {/* form data */}
          <form onSubmit={handelSubmit} className="space-y-6">
            {/* full name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-2 left-0 pl-3 flex item-center pointer-events-none">
                  <User className="size-5 text-base-content/40 items-center" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="Rnsn srb"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
                <button></button>
              </div>
            </div>
            {/* email */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-2 left-0 pl-3  justify-center flex item-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40 items-center" />
                </div>
                <div className="flex justify-around  gap-4">
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  {emailVerify ? (
                    <input
                      type="text"
                      className="w-18 input"
                      maxLength={6}
                      placeholder="otp"
                      ref={emailInput}
                      onChange={(e) => {
                        let len = emailInput.current.value;
                        if (len.length === 6) {
                          if (len === emailOTP) {
                            setButtonText("verified");
                            setEmailVerify(false);
                            setBtnColour(true);
                            setBtnColour2(false);
                          } else {
                            setButtonText("click to generate");
                            toast.error("wrong otp");
                            setEmailVerify(false);
                            setBtnColour(true);
                            setBtnColour2(true);
                          }
                        }
                      }}
                    />
                  ) : (
                    <button
                      className={` btn ${
                        btnColour
                          ? btnColour2
                            ? "bg-red-400"
                            : "bg-success/40 "
                          : "bg-primary/20 "
                      } `}
                      onClick={verifyEmail}
                    >
                      {buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
           

            {/* password */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-2 left-0 pl-3  justify-center flex item-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40 items-center" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="................"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute insert-y-0 right-0 pr-3 flex items-center  top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
            {/* button for  creating account /loading  */}
            <button
              type="submit"
              className="btn btn-primary w-full "
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin " />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          {/* link for the login page */}
          <div className="text-center">
            <p className="text-base-content/60">
              Already have an Account?
              <Link to="/login " className="link link-primary">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* -------------------------------right----------------------------------------------- */}
      <AuthImagePattern
        title={"join our community"}
        subtitle={
          "connect with friends ,share moments and stay in touch with your loved ones. "
        }
      />
    </div>
  );
};

export default SignUp;
