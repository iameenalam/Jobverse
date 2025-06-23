"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/redux/action/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Forgot = () => {
  const [email, setEmail] = useState("");

  const { isAuth, btnLoading } = useSelector((state) => state.user);

  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email, setEmail));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-accent px-4">
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl shadow-xl max-w-md w-full p-10">
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
          Forgot Password
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
              className="
                border border-border rounded-md
                focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                hover:border-primary hover:shadow-md
                transition duration-300 ease-in-out
                shadow-none
              "
              autoComplete="email"
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

        <div className="mt-6 text-center text-sm text-primary-foreground">
          <Link
            href="/login"
            className="relative text-primary underline-offset-4 hover:underline
              before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
              before:bg-primary before:transition-all before:duration-300
              hover:before:w-full"
          >
            Go to login page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
