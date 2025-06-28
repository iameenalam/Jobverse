import axios from "axios";
import {
  SkillAddFail,
  SkillremoveFail,
  btnLoadingStart,
  forgotFail,
  forgotSuccess,
  getUserFail,
  getUserProfileFail,
  getUserProfileSucces,
  getUserSucces,
  loadingStart,
  loginFail,
  loginSuccess,
  photoUpdateFail,
  photoUpdateSuccess,
  registerFail,
  registerSuccess,
  resetFail,
  resetSuccess,
  resumeUpdateFail,
  resumeUpdateSuccess,
  skillAddSuccess,
  skillremoveSuccess,
  updateFail,
  updateSuccess,
} from "../reducer/userReducer";
import Cookies from "js-cookie";
import { getAllCompany } from "./company";

// Helper to get token header
const getAuthHeader = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No authentication token found");
  return { Authorization: `Bearer ${token}` };
};

// REGISTER
export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/register", formdata);

    // Set cookie for both dev and prod
    Cookies.set("token", data.token, {
      expires: 5,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    dispatch(registerSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || error.message));
  }
};

// LOGIN
export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/login", { email, password });

    // Set cookie for both dev and prod
    Cookies.set("token", data.token, {
      expires: 5,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    dispatch(loginSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || error.message));
  }
};

// GET LOGGED IN USER
export const getUser = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/user/myprofile", {
      headers: getAuthHeader(),
    });

    dispatch(getUserSucces(data));
  } catch (error) {
    dispatch(getUserFail(error.response?.data?.message || error.message));
  }
};

// FORGOT PASSWORD
export const forgotPassword = (email, setEmail) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/user/forgot", { email });

    dispatch(forgotSuccess(data));
    setEmail("");
  } catch (error) {
    dispatch(forgotFail(error.response?.data?.message || error.message));
  }
};

// RESET PASSWORD
export const resetPassword =
  (password, token, setPassword) => async (dispatch) => {
    try {
      dispatch(btnLoadingStart());

      const { data } = await axios.post(
        `/api/user/reset?token=${token}`,
        { password }
      );

      dispatch(resetSuccess(data));
      setPassword("");
    } catch (error) {
      dispatch(resetFail(error.response?.data?.message || error.message));
    }
  };

// UPDATE PROFILE PHOTO
export const updatePhoto = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.post(
      "/api/user/update/profilepic",
      formdata,
      { headers: getAuthHeader() }
    );

    dispatch(photoUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(photoUpdateFail(error.response?.data?.message || error.message));
  }
};

// UPDATE PROFILE INFO
export const updateProfile = (name, phoneNumber, bio) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/user/update/info",
      { name, phoneNumber, bio },
      { headers: getAuthHeader() }
    );

    dispatch(updateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(updateFail(error.response?.data?.message || error.message));
  }
};

// UPDATE RESUME
export const updateResume = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.post(
      "/api/user/update/resume",
      formdata,
      { headers: getAuthHeader() }
    );

    dispatch(resumeUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(resumeUpdateFail(error.response?.data?.message || error.message));
  }
};

// ADD SKILL
export const AddSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post(
      "/api/user/skill/add",
      { skill },
      { headers: getAuthHeader() }
    );

    dispatch(skillAddSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillAddFail(error.response?.data?.message || error.message));
  }
};

// REMOVE SKILL
export const removeSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete(
      "/api/user/skill/remove",
      {
        headers: getAuthHeader(),
        data: { skill }, // axios requires `data` for DELETE body
      }
    );

    dispatch(skillremoveSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillremoveFail(error.response?.data?.message || error.message));
  }
};

// GET USER PROFILE (by id)
export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get(
      "/api/user/profile",
      {
        headers: getAuthHeader(),
        params: { id },
      }
    );

    dispatch(getUserProfileSucces(data));
  } catch (error) {
    dispatch(getUserProfileFail(error.response?.data?.message || error.message));
  }
};
