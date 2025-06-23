"use client";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import {
  ApplyForJob,
  applicationofjob,
  getsingleJobs,
  saveJob,
  updateJob,
  updateStatus,
} from "@/redux/action/job";
import { BriefcaseBusiness, MapPin, Save, SaveOff } from "lucide-react";
import { redirect, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const JobPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getsingleJobs(id));
  }, [id]);

  const { job, loading, btnLoading, applications, applicationOfJob } =
    useSelector((state) => state.job);
  const { user, isAuth } = useSelector((state) => state.user);

  if (!isAuth) return redirect("/login");

  const [saved, setSaved] = useState(false);

  let savedJobs;
  if (user) savedJobs = user.savedJobs;

  useEffect(() => {
    if (savedJobs && savedJobs.includes(id)) {
      setSaved(true);
    }
  }, [user]);

  const saveJobHander = () => {
    setSaved(!saved);
    dispatch(saveJob(id));
  };

  const applyHandler = () => {
    dispatch(ApplyForJob(id));
  };

  const [applied, setApplied] = useState(false);

  useEffect(() => {
    if (applications && id) {
      applications.forEach((item) => item.job === id && setApplied(true));
    }
  }, [applications, id]);

  const updateRef = useRef();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [openings, setOpenings] = useState("");
  const [status, setStatus] = useState("");

  const clickUpdate = () => {
    updateRef.current.click();
    setTitle(job.title);
    setDescription(job.description);
    setRole(job.role);
    setSalary(job.salary);
    setExperience(job.experience);
    setLocation(job.location);
    setOpenings(job.openings);
    setStatus(job.status);
  };

  const updateJobHandler = () => {
    dispatch(
      updateJob(
        id,
        title,
        description,
        role,
        salary,
        experience,
        location,
        openings,
        status,
        clickUpdate
      )
    );
  };

  useEffect(() => {
    if (user && user.role === "recruiter") dispatch(applicationofjob(id));
  }, [id, job]);

  const [value, setValue] = useState("");
  const updateApplicationHandler = (Appid) => {
    if (value === "") return alert("please give detail");
    dispatch(updateStatus(Appid, id, value, setValue));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {loading ? (
        <Loading />
      ) : (
        <>
          {job && (
            <div className="w-[95%] md:w-2/3 mx-auto flex flex-col md:flex-row gap-10 px-5 py-16 bg-secondary/60 rounded-xl shadow-lg mt-10">
              {/* LEFT COLUMN - Logo, Title, Details */}
              <div className="flex-1 flex flex-col items-center md:items-start mb-10 md:mb-0">
                {/* Company Logo */}
                <div className="mb-4 flex flex-col items-center w-full">
                  {job.comapnyLogo && (
                    <Link href={`/company/${job.company}`}>
                      <img
                        src={job.comapnyLogo}
                        alt="Company Logo"
                        className="rounded-full w-24 h-24 border-4 border-primary shadow-xl object-cover ring-2 ring-primary/30 transition-transform duration-300 hover:scale-110 bg-white"
                      />
                    </Link>
                  )}
                </div>
                {/* Divider */}
                <div className="w-16 h-[2px] bg-primary/30 rounded-full mb-4"></div>
                {/* Job Title */}
                <h1 className="sm:text-4xl text-3xl mb-4 font-bold tracking-tight text-center md:text-left">
                  {job.title}
                </h1>
                {/* Location */}
                <p className="flex items-center gap-2 text-muted-foreground">
                  <MapPin /> {job.location}
                </p>
                {/* Experience */}
                <p className="flex items-center mt-2 gap-2 text-muted-foreground">
                  <BriefcaseBusiness />
                  {job.experience === 0 ? "Fresher" : job.experience + " Years"}
                </p>
                {/* Salary */}
                <p className="flex items-center mt-2 gap-2 text-muted-foreground">
                  Salary -
                  <span className="font-semibold text-primary">
                    ${job.salary} P.A
                  </span>
                </p>
                {/* Openings */}
                <p className="flex items-center mt-2 gap-2 text-muted-foreground">
                  Openings -
                  <span className="font-semibold">{job.openings}</span>
                </p>
              </div>

              {/* RIGHT COLUMN - Actions, Description */}
              <div className="flex-1 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
                {user && job && user._id === job.recruiter && (
                  <Button onClick={clickUpdate} className="mb-4">
                    Update Job
                  </Button>
                )}
                <p className="mb-2">
                  Status -{" "}
                  {job.status === "open" ? (
                    <span className="text-green-500 font-semibold">Open</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Closed</span>
                  )}
                </p>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  {job.description}
                </p>
                {user && user.role === "jobseeker" && (
                  <div className="flex justify-center items-center gap-2 mb-2">
                    <Button
                      disabled={btnLoading}
                      onClick={saveJobHander}
                      className="transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      {saved ? (
                        <span className="flex justify-center gap-2">
                          Unsave <SaveOff size={18} />
                        </span>
                      ) : (
                        <span className="flex justify-center gap-2">
                          Save <Save size={18} />
                        </span>
                      )}
                    </Button>
                  </div>
                )}
                {user && user.role === "jobseeker" && (
                  <>
                    {applied ? (
                      <p className="text-green-500 mt-3 font-semibold">
                        Already Applied
                      </p>
                    ) : (
                      job.status === "open" && (
                        <Button
                          className="mt-3 bg-gradient-to-r from-primary to-primary-700 text-primary-foreground shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                          onClick={applyHandler}
                          disabled={btnLoading}
                        >
                          Easy Apply
                        </Button>
                      )
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Recruiter Applications Table */}
          {user && job && user._id === job.recruiter && (
            <div className="mt-10 w-[95%] md:w-2/3 mx-auto bg-secondary/60 rounded-xl shadow-lg p-6">
              <h1 className="text-2xl font-bold mb-4">All Applications</h1>
              <Table>
                <TableCaption>All applications for this job</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Profile</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applicationOfJob &&
                    applicationOfJob.map((e) => (
                      <TableRow key={e._id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {e.applicant.name}
                            <select
                              value={value}
                              onChange={(ev) => setValue(ev.target.value)}
                              className="
                                p-2 border border-border rounded-md
                                focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                                hover:border-primary hover:shadow-md
                                transition duration-300 ease-in-out
                                shadow-none
                              "
                            >
                              <option value="">update status</option>
                              <option value="accepted">Accepted</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <Button
                              disabled={btnLoading}
                              onClick={() => updateApplicationHandler(e._id)}
                              className="ml-1 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                              Update
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link
                            target="_blank"
                            href={e.applicant.resume}
                            className="relative text-primary underline-offset-4 hover:underline
                              before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
                              before:bg-primary before:transition-all before:duration-300
                              hover:before:w-full"
                          >
                            Resume
                          </Link>
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`/account/${e.applicant._id}`}
                            className="relative text-primary underline-offset-4 hover:underline
                              before:absolute before:-bottom-1 before:left-0 before:w-0 before:h-[2px]
                              before:bg-primary before:transition-all before:duration-300
                              hover:before:w-full"
                          >
                            Profile
                          </Link>
                        </TableCell>
                        <TableCell>
                          {e.status === "pending" && (
                            <p className="text-yellow-500 font-semibold">
                              {e.status}
                            </p>
                          )}
                          {e.status === "accepted" && (
                            <p className="text-green-500 font-semibold">
                              {e.status}
                            </p>
                          )}
                          {e.status === "rejected" && (
                            <p className="text-red-500 font-semibold">
                              {e.status}
                            </p>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}

      {/* Update Job Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden" ref={updateRef}></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-background/90 backdrop-blur-md border border-border rounded-lg shadow-lg p-6">
          <DialogHeader>
            <DialogTitle>Update Job</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Title</Label>
              <Input
                type="text"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Description</Label>
              <Input
                type="text"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Role</Label>
              <Input
                type="text"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Salary</Label>
              <Input
                type="number"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Experience</Label>
              <Input
                type="number"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Location</Label>
              <Input
                type="text"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Openings</Label>
              <Input
                type="number"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={openings}
                onChange={(e) => setOpenings(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Status</Label>
              <Input
                type="text"
                className="col-span-3
                  border border-border rounded-md
                  focus:outline-none focus:ring-4 focus:ring-primary/50 focus:border-primary
                  hover:border-primary hover:shadow-md
                  transition duration-300 ease-in-out
                  shadow-none"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={updateJobHandler} disabled={btnLoading}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPage;
