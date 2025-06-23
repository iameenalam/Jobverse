"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/redux/action/user";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [resume, setResume] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const { isAuth, btnLoading } = useSelector((state) => state.user);

  if (isAuth) return redirect("/");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("role", role);
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("phoneNumber", phoneNumber);
    if (profilePic) formdata.append("profilePic", profilePic);

    if (role === "jobseeker") {
      formdata.append("bio", bio);
      if (resume) formdata.append("resume", resume);
    }

    dispatch(registerUser(formdata));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-secondary to-accent px-4">
      <div className="bg-background/90 backdrop-blur-md border border-border rounded-xl shadow-xl max-w-md w-full p-10">
        <h2 className="mb-8 text-center text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
          Register to <span className="text-foreground">Job</span>
          <span className="text-red-500">Verse</span>
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <Label
              htmlFor="role"
              className="block mb-2 text-sm font-medium text-muted-foreground"
            >
              Select Role
            </Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="
                w-full p-2 border border-border rounded-md
                focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                hover:border-primary hover:shadow-md
                transition duration-300 ease-in-out
                shadow-none
              "
            >
              <option value="">Select Role</option>
              <option value="jobseeker">JobSeeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          {role && (
            <>
              <div>
                <Label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-muted-foreground"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
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
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-muted-foreground"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-muted-foreground"
                >
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
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
                  htmlFor="profilePic"
                  className="block mb-2 text-sm font-medium text-muted-foreground"
                >
                  Profile Picture
                </Label>
                <Input
                  id="profilePic"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  required
                  className="
                    border border-border rounded-md
                    focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                    hover:border-primary hover:shadow-md
                    transition duration-300 ease-in-out
                    shadow-none
                  "
                />
              </div>

              {role === "jobseeker" && (
                <>
                  <div>
                    <Label
                      htmlFor="resume"
                      className="block mb-2 text-sm font-medium text-muted-foreground"
                    >
                      Resume (PDF)
                    </Label>
                    <Input
                      id="resume"
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => setResume(e.target.files[0])}
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
                      htmlFor="bio"
                      className="block mb-2 text-sm font-medium text-muted-foreground"
                    >
                      Bio
                    </Label>
                    <Input
                      id="bio"
                      type="text"
                      placeholder="Enter Bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="
                        border border-border rounded-md
                        focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                        hover:border-primary hover:shadow-md
                        transition duration-300 ease-in-out
                        shadow-none
                      "
                    />
                  </div>
                </>
              )}

              <Button
                disabled={btnLoading}
                className="
                  w-full flex justify-center items-center gap-2
                  bg-gradient-to-r from-primary to-primary-700
                  text-primary-foreground font-semibold rounded-md
                  shadow-md hover:shadow-lg
                  transform hover:scale-[1.03] focus:scale-[1.03]
                  transition-all duration-300 ease-in-out
                  mt-4
                "
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
            </>
          )}

          <div className="mt-6 flex flex-col items-center space-y-2 text-sm text-primary-foreground">
            <Link
              href="/login"
              className="relative text-primary underline-offset-4 hover:underline
                before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
                before:bg-primary before:transition-all before:duration-300
                hover:before:w-full"
            >
              Have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
