"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ModeToggle } from "./togglebutton";
import { LogOut, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Cookies from "js-cookie";
import { logoutSuccess } from "@/redux/reducer/userReducer";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((open) => !open);

  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    Cookies.remove("token");
    setIsOpen(false);
    dispatch(logoutSuccess());
  };

  return (
    <nav
      className="z-50 sticky top-0 bg-background/80 backdrop-blur-md border-b border-border transition-colors duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Brand */}
          <div className="flex items-center select-none">
            <Link href="/" className="flex items-center">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight drop-shadow-md m-0 p-0">
                Job
                <span className="text-red-500">Verse</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 lg:space-x-10 items-center text-base sm:text-lg font-medium">
            {["/", "/jobs", "/about"].map((path) => {
              const label =
                path === "/"
                  ? "Home"
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative group px-1 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
                >
                  {label}
                  <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] ease-in-out duration-300" />
                </Link>
              );
            })}

            {isAuth ? (
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    aria-label="User menu"
                    className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full transition-transform duration-200 hover:scale-110 hover:shadow-lg"
                  >
                    <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
                      <AvatarImage
                        src={user?.profilePic}
                        alt={user?.name || "User avatar"}
                      />
                      <AvatarFallback>
                        {user?.name?.slice(0, 1) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-44 p-4 space-y-2" side="bottom" align="end">
                  <Button variant="outline" className="w-full">
                    <Link href="/account" tabIndex={-1}>
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-full flex justify-center items-center gap-2"
                    onClick={logoutHandler}
                  >
                    Logout <LogOut size={18} />
                  </Button>
                </PopoverContent>
              </Popover>
            ) : (
              <Link
                href="/login"
                className="relative group px-1 py-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Login
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary group-hover:w-full transition-[width] ease-in-out duration-300" />
              </Link>
            )}

            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-2">
            <ModeToggle />
            <button
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-in-out bg-background/95 backdrop-blur-lg border-b border-border
        ${isOpen ? "max-h-96" : "max-h-0"}`}
        style={{
          boxShadow: isOpen ? "0 4px 20px 0 rgba(0,0,0,0.07)" : undefined,
        }}
      >
        <div className="px-2 xs:px-4 pt-3 pb-5 space-y-2 text-center font-medium text-base sm:text-lg">
          {["/", "/jobs", "/about"].map((path) => {
            const label =
              path === "/"
                ? "Home"
                : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
            return (
              <Link
                key={path}
                href={path}
                onClick={toggleMenu}
                className="block rounded-md px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-300"
              >
                {label}
              </Link>
            );
          })}

          {isAuth ? (
            <>
              <Link
                href="/account"
                onClick={toggleMenu}
                className="block rounded-md px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-300"
              >
                Account
              </Link>
              <Button
                variant="destructive"
                className="w-full flex justify-center items-center gap-2 mt-1"
                size="sm"
                onClick={logoutHandler}
              >
                Logout <LogOut size={18} />
              </Button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={toggleMenu}
              className="block rounded-md px-4 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 420px) {
          .xs\:px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;