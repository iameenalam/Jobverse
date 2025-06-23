"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/redux/action/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuth, btnLoading } = useSelector((state) => state.user);

  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-accent px-4">
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl shadow-xl max-w-md w-full p-10">
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
          Login to <span className="text-foreground">Job</span>
          <span className="text-red-500">Verse</span>
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="
                border border-border rounded-md
                focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                hover:border-primary hover:shadow-md
                transition duration-300 ease-in-out
                shadow-none
              "
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="
                border border-border rounded-md
                focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                hover:border-primary hover:shadow-md
                transition duration-300 ease-in-out
                shadow-none
              "
            />
          </div>

          <Button
            type="submit"
            disabled={btnLoading}
            className="w-full flex justify-center items-center gap-2
              bg-gradient-to-r from-primary to-primary-700
              text-primary-foreground font-semibold rounded-md
              shadow-md hover:shadow-lg
              transform hover:scale-[1.03] focus:scale-[1.03]
              transition-all duration-300 ease-in-out"
          >
            {btnLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              <>
                Submit <ArrowRight size={18} />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-primary-foreground">
          <Link
            href="/register"
            className="relative text-primary underline-offset-4 hover:underline
              before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
              before:bg-primary before:transition-all before:duration-300
              hover:before:w-full"
          >
            Don&apos;t have an account?
          </Link>
          <Link
            href="/forgot"
            className="relative text-primary underline-offset-4 hover:underline
              before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
              before:bg-primary before:transition-all before:duration-300
              hover:before:w-full"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
