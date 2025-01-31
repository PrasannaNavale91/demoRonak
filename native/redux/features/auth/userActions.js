import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// action login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "loginRequest",
    });
    // hitting node login api request
    const { data } = await axios.post(
      `${server}/api/auth/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "logingSucess",
      payload: data,
    });
    await AsyncStorage.setItem("@auth", data?.token);
  } catch (error) {
    console.log("Axios Error: ", error);
    console.log("Error Response: ", error.response?.data);
    dispatch({
      type: "loginFail",
      payload: error.response.data.message,
    });
  }
};
// register action
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: "registerRequest",
    });
    // hitapi register
    const { data } = await axios.post(`${server}/api/auth/register`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: "registerSucess",
      payload: data.message,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "registerFail",
      payload: error.response.data.message,
    });
  }
};

// GET USER DATTA ACTION\
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    // hitting node login api request
    const { data } = await axios.post(`${server}/api/shop/profile`);
    dispatch({
      type: "getUserDataSucess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response.data.message,
    });
  }
};
// LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    // hitting node login api request
    const { data } = await axios.get(`${server}/api/auth/logout`);
    dispatch({
      type: "logoutSucess",
      payload: data?.message,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};