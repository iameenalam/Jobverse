"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Loading from "./loading";
import JobCard from "./JobCard";

const Mid = () => {
  const { loading, topSix } = useSelector((state) => state.job);

  return (
    <div className="mt-12 mb-12 max-w-7xl mx-auto px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-extrabold mb-3 md:mb-0">
          Latest Jobs on Job
          <span className="text-red-500">Verse</span>
        </h1>
        <Link href={"/jobs"}>
          <Button
            variant="secondary"
            className="flex items-center gap-2 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 group"
          >
            View All
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
            <span
              className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
              aria-hidden
            />
          </Button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-wrap gap-8 justify-center">
          {topSix && topSix.length > 0 ? (
            topSix.map((e) => <JobCard key={e._id} job={e} />)
          ) : (
            <p className="text-lg text-muted-foreground">No Jobs Yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Mid;
