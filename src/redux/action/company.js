import axios from "axios";
import {
  getAllCompanyFail,
  getAllCompanySuccess,
  loadingStart,
  btnLoadingStart,
  addCompanySuccess,
  addCompanyFail,
  getSingleCompanySuccess,
  getSingleCompanyFail,
  deleteCompanySuccess,
  deleteCompanyFail,
} from "../reducer/comapnyReducer";
import Cookies from "js-cookie";

const getAuthHeader = () => {
  const token = Cookies.get("token");
  if (!token) throw new Error("No authentication token found");
  return { Authorization: `Bearer ${token}` };
};

export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/company/all", {
      headers: getAuthHeader(),
    });

    dispatch(getAllCompanySuccess(data));
  } catch (error) {
    dispatch(getAllCompanyFail(error.response?.data?.message || error.message));
  }
};

export const addCompany = (formdata, clearData) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.post("/api/company/new", formdata, {
      headers: getAuthHeader(),
    });

    dispatch(addCompanySuccess(data));
    dispatch(getAllCompany());
    clearData();
  } catch (error) {
    dispatch(addCompanyFail(error.response?.data?.message || error.message));
  }
};

export const getSingleCompany = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());

    const { data } = await axios.get("/api/company/single", {
      headers: getAuthHeader(),
      params: { id },
    });

    dispatch(getSingleCompanySuccess(data));
  } catch (error) {
    dispatch(
      getSingleCompanyFail(error.response?.data?.message || error.message)
    );
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());

    const { data } = await axios.delete("/api/company/delete", {
      headers: getAuthHeader(),
      params: { id },
    });

    dispatch(deleteCompanySuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(deleteCompanyFail(error.response?.data?.message || error.message));
  }
};
