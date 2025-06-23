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

export const registerUser = (formdata) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const { data } = await axios.post("/api/user/register", formdata);
    Cookies.set("token", data.token, { expires: 5, secure: true, path: "/" });
    dispatch(registerSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || "Register failed"));
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const { data } = await axios.post("/api/user/login", { email, password });
    Cookies.set("token", data.token, { expires: 5, secure: true, path: "/" });
    dispatch(loginSuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(loginFail(error.response?.data?.message || "Login failed"));
  }
};

export const getUser = () => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(getUserFail("No token found"));

    const { data } = await axios.get(`/api/user/myprofile?token=${token}`);
    dispatch(getUserSucces(data));
  } catch (error) {
    dispatch(getUserFail(error.response?.data?.message || "Failed to get user"));
  }
};

export const forgotPassword = (email, setEmail) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const { data } = await axios.post("/api/user/forgot", { email });
    dispatch(forgotSuccess(data));
    setEmail("");
  } catch (error) {
    dispatch(forgotFail(error.response?.data?.message || "Failed to send reset link"));
  }
};

export const resetPassword = (password, token, setPassword) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const { data } = await axios.post(`/api/user/reset?token=${token}`, { password });
    dispatch(resetSuccess(data));
    setPassword("");
  } catch (error) {
    dispatch(resetFail(error.response?.data?.message || "Reset failed"));
  }
};

export const updatePhoto = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(photoUpdateFail("No token found"));

    const { data } = await axios.post(`/api/user/update/profilepic?token=${token}`, formdata);
    dispatch(photoUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(photoUpdateFail(error.response?.data?.message || "Photo update failed"));
  }
};

export const updateProfile = (name, phoneNumber, bio) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(updateFail("No token found"));

    const { data } = await axios.post(`/api/user/update/info?token=${token}`, {
      name,
      phoneNumber,
      bio,
    });

    dispatch(updateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(updateFail(error.response?.data?.message || "Profile update failed"));
  }
};

export const updateResume = (formdata) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(resumeUpdateFail("No token found"));

    const { data } = await axios.post(`/api/user/update/resume?token=${token}`, formdata);
    dispatch(resumeUpdateSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(resumeUpdateFail(error.response?.data?.message || "Resume update failed"));
  }
};

export const AddSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(SkillAddFail("No token found"));

    const { data } = await axios.post(`/api/user/skill/add?token=${token}`, { skill });
    dispatch(skillAddSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillAddFail(error.response?.data?.message || "Failed to add skill"));
  }
};

export const removeSkill = (skill) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(SkillremoveFail("No token found"));

    const { data } = await axios.delete(
      `/api/user/skill/remove?token=${token}&skill=${skill}`
    );

    dispatch(skillremoveSuccess(data));
    dispatch(getUser());
  } catch (error) {
    dispatch(SkillremoveFail(error.response?.data?.message || "Failed to remove skill"));
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(getUserProfileFail("No token found"));

    const { data } = await axios.get(`/api/user/profile?token=${token}&id=${id}`);
    dispatch(getUserProfileSucces(data));
  } catch (error) {
    dispatch(getUserProfileFail(error.response?.data?.message || "Failed to get profile"));
  }
};
