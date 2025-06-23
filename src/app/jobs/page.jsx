"use client";
import JobCard from "@/components/JobCard";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllJobs } from "@/redux/action/job";
import { Filter } from "lucide-react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const JobsPage = () => {
  const { loading, jobs, locations } = useSelector((state) => state.job);

  const ref = useRef();

  const clickEvent = () => {
    ref.current.click();
  };

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState(15);

  const filterJobs = () => {
    dispatch(getAllJobs(title, location, experience));
    ref.current.click();
  };

  const clearFilter = () => {
    setTitle("");
    setLocation("");
    setExperience(15);

    dispatch(getAllJobs());
    ref.current.click();
  };

  const [page, setPage] = useState(1);

  const totalPages = jobs ? Math.ceil(jobs.length / 6) : 0;

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Animation variants
  const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, type: "spring" },
  };

  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground py-8">
      {/* Hero Section */}
      <motion.section
        {...fadeUp}
        className="max-w-7xl mx-auto px-6 mb-12"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-8">
          <div className="flex-1 text-center md:text-left">
            <motion.h1
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Find Your <span className="text-red-500">Dream Job</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
              className="text-lg md:text-xl text-muted-foreground max-w-xl"
            >
              Discover thousands of opportunities from top companies. Use filters to find jobs that match your skills and ambitions.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
            className="flex flex-col items-center gap-3"
          >
            <Button
              variant="secondary"
              onClick={clickEvent}
              className="flex items-center gap-2 shadow-lg hover:shadow-2xl transition-all"
            >
              <Filter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </Button>
            <span className="text-xs text-muted-foreground">Advanced search</span>
          </motion.div>
        </div>
      </motion.section>

      {/* Jobs Grid */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <Loading />
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: { transition: { staggerChildren: 0.08 } },
            }}
            className="flex flex-wrap gap-8 justify-center"
          >
            <AnimatePresence>
              {jobs && jobs.length > 0 ? (
                jobs
                  .slice((page - 1) * 6, page * 6)
                  .map((job) => (
                    <motion.div
                      key={job._id}
                      initial={{ opacity: 0, y: 30, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 30, scale: 0.97 }}
                      transition={{ duration: 0.5, type: "spring" }}
                      className="w-full sm:w-[340px] md:w-[360px]"
                    >
                      <JobCard job={job} />
                    </motion.div>
                  ))
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center w-full text-lg text-muted-foreground"
                >
                  No Jobs Yet
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem
                    className="cursor-pointer hover:bg-primary/20 transition-colors rounded"
                    onClick={prevPage}
                    aria-label="Previous page"
                  >
                    <PaginationPrevious />
                  </PaginationItem>
                )}
                <span className="mx-4 text-lg font-medium text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                {page < totalPages && (
                  <PaginationItem
                    className="cursor-pointer hover:bg-primary/20 transition-colors rounded"
                    onClick={nextPage}
                    aria-label="Next page"
                  >
                    <PaginationNext />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </section>

      {/* Filter Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={ref} className="hidden" />
        </DialogTrigger>

        <DialogContent className="sm:max-w-md bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg p-6 animate-fade-in">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center gap-2 text-xl font-semibold">
              Filters <Filter size={20} />
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="title" className="text-sm font-medium">
                Search with title
              </Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Job title"
                autoComplete="off"
                className="
                  col-span-3 border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none
                "
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="location" className="text-sm font-medium">
                Location
              </Label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="
                  col-span-3 w-full p-2 border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none
                "
              >
                <option value="">Select Location</option>
                {locations &&
                  locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor="experience" className="text-sm font-medium">
                Experience
              </Label>
              <select
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="
                  col-span-3 w-full p-2 border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none
                "
              >
                <option value={15}>Select Experience</option>
                <option value={0}>Fresher</option>
                {[...Array(8).keys()].slice(1).map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? "year" : "years"}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          <DialogFooter className="flex justify-between">
            <Button
              onClick={filterJobs}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Apply
            </Button>
            <Button variant="destructive" onClick={clearFilter}>
              Clear Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CSS for fade-in */}
      <style jsx global>{`
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: none;}
        }
      `}</style>
    </div>
  );
};

export default JobsPage;
