import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

const Hero = () => {
  // For fade-in animation on mount
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className={`relative overflow-hidden body-font transition-opacity duration-700 ease-out ${
        isVisible ? "opacity-100" : "opacity-0 translate-y-6"
      }`}
      style={{
        backgroundColor: "hsl(var(--secondary))",
        color: "hsl(var(--secondary-foreground))",
      }}
    >
      <div className="container mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-20 md:py-32 min-h-[70vh] relative z-10">
        <h1
          className="text-center font-extrabold leading-tight tracking-tight mb-7 sm:mb-8
            text-3xl xs:text-4xl sm:text-5xl md:text-6xl
          "
          style={{ color: "hsl(var(--foreground))" }}
        >
          Your Gateway to
          <span className="text-red-500 drop-shadow-sm"> Better Careers</span>
          <span className="block text-xl xs:text-2xl md:text-3xl font-semibold mt-3 sm:mt-4 text-primary/90">
            Your go-to solution for finding jobs
          </span>
          {/* Animated underline accent */}
          <span
            aria-hidden="true"
            className="mx-auto block h-1 w-24 bg-primary rounded mt-3 animate-underline"
            style={{ backgroundColor: "hsl(var(--primary))" }}
          />
        </h1>
        <p
          className="mb-9 sm:mb-12 w-full max-w-md sm:max-w-xl md:max-w-2xl leading-relaxed text-muted-foreground tracking-wide text-base xs:text-lg sm:text-xl text-center opacity-0 animate-fade-in"
          style={{
            color: "hsl(var(--muted-foreground))",
            letterSpacing: "0.02em",
            animationDelay: "0.3s",
            animationFillMode: "forwards",
          }}
        >
          Discover your dream job with <span className="font-semibold">JobVerse</span>. We connect talented professionals with top companies worldwide. Start your journey today and unlock endless opportunities.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 w-full max-w-xs sm:max-w-none mx-auto justify-center items-center">
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-base xs:text-lg px-6 sm:px-7 py-3 font-semibold">
              Browse Jobs
            </Button>
          </Link>
          <Link href="/about" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-base xs:text-lg px-6 sm:px-7 py-3 font-semibold"
            >
              About Us
            </Button>
          </Link>
        </div>
      </div>

      {/* Custom keyframes for underline and fade-in */}
      <style jsx global>{`
        @media (max-width: 420px) {
          .xs\\:text-2xl { font-size: 1.5rem !important; }
          .xs\\:text-4xl { font-size: 2.25rem !important; }
          .xs\\:text-lg { font-size: 1.125rem !important; }
        }
        @keyframes underline {
          0% {
            width: 0;
            opacity: 0.2;
          }
          60% {
            width: 80px;
            opacity: 0.7;
          }
          100% {
            width: 96px;
            opacity: 1;
          }
        }
        .animate-underline {
          animation: underline 1s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-in {
          animation: fade-in 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
        }
      `}</style>
    </section>
  );
};

export default Hero;