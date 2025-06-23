"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { BriefcaseBusiness, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { ApplyForJob } from "@/redux/action/job";

const JobCard = ({ job }) => {
  const { user } = useSelector((state) => state.user);
  const { btnLoading, applications } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const applyHandler = () => {
    dispatch(ApplyForJob(job._id));
  };

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && job._id) {
      applications.forEach((item) => item.job === job._id && setApplied(true));
    }
  }, [applications, job._id]);

  return (
    <Card className="w-[350px] bg-background/90 backdrop-blur-md border border-border rounded-xl shadow-xl transition-transform duration-300 hover:scale-[1.025] hover:shadow-2xl">
      <CardHeader>
        <div className="flex justify-between items-center gap-3">
          <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
          <Link href={`/company/${job.company}`}>
            <img
              src={job.comapnyLogo}
              alt="company"
              className="rounded-full w-14 h-14 border-2 border-primary shadow-md object-cover transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>
        <CardDescription className="flex items-center gap-2 mt-2 text-[15px] text-muted-foreground">
          <BriefcaseBusiness className="w-5 h-5" />
          {job.experience === 0 ? "Fresher" : `${job.experience} Years`}
        </CardDescription>
        <CardDescription className="flex items-center gap-2 text-[15px] text-muted-foreground">
          <MapPin className="w-5 h-5" /> {job.location}
        </CardDescription>
        <CardDescription className="text-[15px] mt-1 text-primary font-semibold">
          $ {job.salary} P.A
        </CardDescription>
      </CardHeader>

      <CardContent className="text-[15px] text-muted-foreground">
        {job.description.slice(0, 62)}...
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <Link href={`/jobs/${job._id}`}>
          <Button
            variant="outline"
            className="transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            View Detail
          </Button>
        </Link>

        {user && user.role === "jobseeker" && (
          <>
            {applied ? (
              <span className="text-green-500 font-semibold">
                Already Applied
              </span>
            ) : job.status === "closed" ? (
              <span className="text-red-500 font-semibold">Closed</span>
            ) : (
              <Button
                onClick={applyHandler}
                disabled={btnLoading}
                className="bg-gradient-to-r from-primary to-primary-700 text-primary-foreground shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Easy Apply
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default JobCard;
