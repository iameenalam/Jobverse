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

export const getAllCompany = () => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(getAllCompanyFail("No token found"));

    const { data } = await axios.get(`/api/company/all?token=${token}`);
    dispatch(getAllCompanySuccess(data));
  } catch (error) {
    dispatch(getAllCompanyFail(error.response?.data?.message || "Failed to fetch companies"));
  }
};

export const addCompany = (formdata, clearData) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(addCompanyFail("No token found"));

    const { data } = await axios.post(`/api/company/new?token=${token}`, formdata);
    dispatch(addCompanySuccess(data));
    dispatch(getAllCompany());
    clearData();
  } catch (error) {
    dispatch(addCompanyFail(error.response?.data?.message || "Failed to add company"));
  }
};

export const getSingleCompany = (id) => async (dispatch) => {
  try {
    dispatch(loadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(getSingleCompanyFail("No token found"));

    const { data } = await axios.get(`/api/company/single?token=${token}&id=${id}`);
    dispatch(getSingleCompanySuccess(data));
  } catch (error) {
    dispatch(getSingleCompanyFail(error.response?.data?.message || "Failed to fetch company"));
  }
};

export const deleteCompany = (id) => async (dispatch) => {
  try {
    dispatch(btnLoadingStart());
    const token = Cookies.get("token");
    if (!token) return dispatch(deleteCompanyFail("No token found"));

    const { data } = await axios.delete(`/api/company/delete?token=${token}&id=${id}`);
    dispatch(deleteCompanySuccess(data));
    dispatch(getAllCompany());
  } catch (error) {
    dispatch(deleteCompanyFail(error.response?.data?.message || "Failed to delete company"));
  }
};
