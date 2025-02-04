import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, islogingIng } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData);
  };
  return (
    <div className="grid min-h-screen lg:grid-cols-2  ">
    {/* -------------------------------------left-------------------------------------------- */}
    <div className="flex flex-col items-center p-6   sm:p-12 ">
      <div className="w-full max-w-md space-y-8">
        {/* logo */}
        <div className="text-center mb-8 mt-14">
          <div className="flex flex-col gap-2 group items-center">
            <div
              className="size-12 rounded-xl bg-primary/10 flex items-center
             justify-center group-hover:bg-primary/20 transition-colors"
            >
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mt-2">Sign In</h1>
            <p className="text-base-content/60">
              Get stated with your free account
            </p>
          </div>
        </div>
        {/* form data */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-2 left-0 pl-3  justify-center flex item-center pointer-events-none">
                <Mail className="size-5 text-base-content/40 items-center" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
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
                placeholder="............"
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
            disabled={islogingIng}
          >
            {islogingIng ? (
              <>
                <Loader2 className="size-5 animate-spin " />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
        {/* link for the login page */}
        <div className="text-center">
          <p className="text-base-content/60">
            Already have an Account?
            <Link to="/signup " className="link link-primary">
              Create account 
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

export default LoginPage;
