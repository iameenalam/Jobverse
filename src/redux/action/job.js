import axios from "axios";
import {
  addJobFail,
  addJobSuccess,
  applyFail,
  applySuccess,
  btnLoadingStart,
  deleteFail,
  deleteSuccess,
  getAllJObsFail,
  getAllJObsSuccess,
  getApplicationsFail,
  getApplicationsSuccess,
  getJobofComapnyFail,
  getJobofComapnySuccess,
  getSingleJobFail,
  getSingleJobSuccess,
  loadingStart,
  saveJobFail,
  saveJobSuccess,
  updateAppFail,
  updateAppSuccess,
  updateFail,
  updateSuccess,
} from "../reducer/jobReducer";
import Cookies from "js-cookie";
import { getUser } from "./user";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No authentication token found");
  return { Authorization: `Bearer ${token}` };
};

export const getAllJobs = (title, location, experience) => async (dispatch) => {
  if (title === undefined) title = "";
  if (location === undefined) location = "";
  if (experience === undefined) experience = 15;
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/job/all", {
      params: { title, location, experience },
    });

    dispatch(getAllJObsSuccess(data));
  } catch (error) {
    dispatch(getAllJObsFail(error.response?.data?.message || error.message));
  }
};

export const AddJob =
  (
    company,
    title,
    description,
    role,
    salary,
    experience,
    location,
    openings,
    clearInput
  ) =>
  async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.post(
        "/api/job/new",
        { title, description, role, salary, experience, location, openings },
        {
          headers: getAuthHeader(),
          params: { company },
        }
      );

      dispatch(addJobSuccess(data));
      dispatch(getAllJobs());
      clearInput();
    } catch (error) {
      dispatch(addJobFail(error.response?.data?.message || error.message));
    }
  };

export const getsingleJobs = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/job/single", {
      headers: getAuthHeader(),
      params: { id },
    });

    dispatch(getSingleJobSuccess(data));
  } catch (error) {
    dispatch(getSingleJobFail(error.response?.data?.message || error.message));
  }
};

export const saveJob = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/job/save",
      {},
      {
        headers: getAuthHeader(),
        params: { id },
      }
    );

    dispatch(saveJobSuccess(data));
    dispatch(getsingleJobs(id));
    dispatch(getUser());
  } catch (error) {
    dispatch(saveJobFail(error.response?.data?.message || error.message));
  }
};

export const getAllApplications = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/job/application/all", {
      headers: getAuthHeader(),
    });

    dispatch(getApplicationsSuccess(data));
  } catch (error) {
    dispatch(
      getApplicationsFail(error.response?.data?.message || error.message)
    );
  }
};

export const ApplyForJob = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/job/application/new",
      {},
      {
        headers: getAuthHeader(),
        params: { id },
      }
    );

    dispatch(applySuccess(data));
    dispatch(getAllApplications());
  } catch (error) {
    dispatch(applyFail(error.response?.data?.message || error.message));
  }
};

export const updateJob =
  (
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
  ) =>
  async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.post(
        "/api/job/update",
        {
          title,
          description,
          role,
          salary,
          experience,
          location,
          openings,
          status,
        },
        {
          headers: getAuthHeader(),
          params: { id },
        }
      );

      dispatch(updateSuccess(data));
      dispatch(getsingleJobs(id));
      clickUpdate();
    } catch (error) {
      dispatch(updateFail(error.response?.data?.message || error.message));
    }
  };

export const applicationofjob = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/job/application/company", {
      headers: getAuthHeader(),
      params: { jobId: id },
    });

    dispatch(getJobofComapnySuccess(data));
  } catch (error) {
    dispatch(
      getJobofComapnyFail(error.response?.data?.message || error.message)
    );
  }
};

export const updateStatus =
  (id, jobId, value, setvalue) => async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.put(
        "/api/job/application/update",
        { value },
        {
          headers: getAuthHeader(),
          params: { id },
        }
      );

      dispatch(updateAppSuccess(data));
      dispatch(applicationofjob(jobId));
      setvalue("");
    } catch (error) {
      dispatch(updateAppFail(error.response?.data?.message || error.message));
    }
  };

export const deleteJob = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete("/api/job/delete", {
      headers: getAuthHeader(),
      params: { id },
    });

    dispatch(deleteSuccess(data));
    dispatch(getAllJobs());
  } catch (error) {
    dispatch(deleteFail(error.response?.data?.message || error.message));
  }
};
