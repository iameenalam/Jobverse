"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  Users,
  Globe,
  Award,
  Sparkles,
  HeartHandshake,
  TrendingUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    quote:
      "JobVerse helped me land my dream job in less than a month. The process was smooth and the team truly cares.",
    name: "Sara Malik",
    role: "Software Engineer",
  },
  {
    quote:
      "The platform is intuitive and the support is amazing. I found the perfect candidate for my startup!",
    name: "Omar Siddiqui",
    role: "Startup Founder",
  },
  {
    quote:
      "I love how JobVerse values diversity and inclusion. It’s not just talk-they walk the walk.",
    name: "Zainab Ahmed",
    role: "HR Manager",
  },
  {
    quote:
      "The best job portal I’ve used-beautiful design, real jobs, and a community that feels like family.",
    name: "Imran Qureshi",
    role: "UI/UX Designer",
  },
];

const values = [
  {
    icon: <Users className="w-10 h-10 text-primary mb-3" />,
    title: "Community",
    desc: "We foster a supportive, collaborative environment for all.",
  },
  {
    icon: <Globe className="w-10 h-10 text-primary mb-3" />,
    title: "Diversity",
    desc: "We celebrate and support diversity, equity, and inclusion in every hire.",
  },
  {
    icon: <Award className="w-10 h-10 text-primary mb-3" />,
    title: "Integrity",
    desc: "We believe in honest, transparent, and ethical practices.",
  },
  {
    icon: <Sparkles className="w-10 h-10 text-primary mb-3" />,
    title: "Innovation",
    desc: "We embrace creativity and constantly improve our platform.",
  },
  {
    icon: <HeartHandshake className="w-10 h-10 text-primary mb-3" />,
    title: "Empowerment",
    desc: "We empower job seekers and employers to achieve their best.",
  },
  {
    icon: <TrendingUp className="w-10 h-10 text-primary mb-3" />,
    title: "Growth",
    desc: "We help people and companies grow, together.",
  },
];

// Testimonial slider with animation
const TestimonialSlider = ({ testimonials, interval = 6000 }) => {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(
      () => setIndex((i) => (i + 1) % testimonials.length),
      interval
    );
    return () => clearTimeout(timeoutRef.current);
  }, [index, testimonials.length, interval]);

  const prev = () => {
    clearTimeout(timeoutRef.current);
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const next = () => {
    clearTimeout(timeoutRef.current);
    setIndex((i) => (i + 1) % testimonials.length);
  };

  return (
    <div className="relative max-w-3xl mx-auto bg-background/90 rounded-xl shadow-2xl p-12 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5 }}
          className="italic mb-8 text-2xl text-muted-foreground min-h-[6rem]"
        >
          &ldquo;{testimonials[index].quote}&rdquo;
        </motion.p>
      </AnimatePresence>
      <div className="font-bold text-xl text-primary mb-1">{testimonials[index].name}</div>
      <div className="text-md text-muted-foreground mb-8">{testimonials[index].role}</div>
      <div className="flex justify-center gap-3 mb-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary" : "bg-muted"
            }`}
            onClick={() => {
              clearTimeout(timeoutRef.current);
              setIndex(i);
            }}
            aria-label={`Show testimonial ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex justify-center gap-6">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="rounded-full bg-primary/20 hover:bg-primary/40 p-3 transition"
        >
          &#8592;
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="rounded-full bg-primary/20 hover:bg-primary/40 p-3 transition"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, type: "spring" },
};

const About = () => {
  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground">
      {/* Hero Section */}
      <motion.section
        {...fadeUp}
        className="container mx-auto px-6 py-16 md:flex md:items-center md:gap-16"
      >
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, type: "spring" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative md:w-1/2 w-full mb-10 md:mb-0"
        >
          <img
            src="/about.jpg"
            alt="About JobVerse"
            className="rounded-lg shadow-2xl object-cover w-full h-[350px] md:h-[450px] border-4 border-primary/30"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-black/40 rounded-lg pointer-events-none" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
          viewport={{ once: true, amount: 0.2 }}
          className="md:w-1/2 w-full text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative inline-block">
            Our Mission At Job{" "}
            <span className="text-red-500 relative">
              <span className="underline decoration-red-400 decoration-4">Verse</span>
            </span>
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 drop-shadow-sm mb-6">
            At JobVerse, we're dedicated to revolutionizing the job search experience. Our mission is to create meaningful connections between talented individuals and forward-thinking companies, fostering growth and success for both.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
            <div className="bg-background/80 rounded-lg px-4 py-2 shadow">
              <span className="font-bold text-primary">Founded:</span> 2023
            </div>
            <div className="bg-background/80 rounded-lg px-4 py-2 shadow">
              <span className="font-bold text-primary">Jobs Posted:</span> 2,500+
            </div>
            <div className="bg-background/80 rounded-lg px-4 py-2 shadow">
              <span className="font-bold text-primary">Countries Served:</span> 12
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Core Values Section */}
      <motion.section
        {...fadeUp}
        className="container mx-auto px-6 py-12"
      >
        <h3 className="text-3xl font-bold mb-10 text-center">Our Core Values</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background/90 rounded-2xl p-10 shadow-lg flex flex-col items-center hover:shadow-2xl transition-all duration-300 animate-float"
            >
              {v.icon}
              <h4 className="font-semibold text-primary mb-3 text-xl">{v.title}</h4>
              <p className="text-muted-foreground text-center text-lg">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Meet the Team */}

      {/* Diversity & Inclusion */}
      <motion.section
        {...fadeUp}
        className="container mx-auto px-6 py-16"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="bg-primary/10 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl"
        >
          <h3 className="text-3xl font-bold mb-6 text-primary">Diversity & Inclusion</h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We’re committed to building a team and community that reflects the world we serve. At HireHeaven, everyone belongs-regardless of background, identity, or experience.
          </p>
        </motion.div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        {...fadeUp}
        className="container mx-auto px-6 py-16"
      >
        <h3 className="text-3xl font-bold mb-12 text-center">What People Say</h3>
        <TestimonialSlider testimonials={testimonials} />
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="bg-primary/10 py-20 mt-20"
      >
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-5xl font-extrabold mb-8 text-primary">
            Ready to find your dream job?
          </h2>
          <p className="text-xl mb-12 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful job seekers on JobVerse and take the next step in your career journey.
          </p>
          <Link href="/jobs" passHref>
            <Button className="px-10 py-4 text-xl font-semibold shadow-xl hover:shadow-2xl transition-shadow duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </motion.section>
      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px);}
          50% { transform: translateY(-8px);}
          100% { transform: translateY(0px);}
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes bounce-once {
          0% { transform: scale(1);}
          30% { transform: scale(1.12);}
          60% { transform: scale(0.96);}
          100% { transform: scale(1);}
        }
        .animate-bounce-once {
          animation: bounce-once 0.8s;
        }
      `}</style>
    </div>
  );
};

export default About;
