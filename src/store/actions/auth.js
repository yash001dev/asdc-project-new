import Types from "../types/auth";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
export const loginUser = (user) => {
  return async function (dispatch) {
    dispatch({
      type: Types.SIGNIN_USER_STARTED,
    });
    try {
      const { data } = await axios.post(`${baseURL}/authenticate`, user);
      dispatch({
        type: Types.SIGNIN_USER_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (e) {
      dispatch({
        type: Types.SIGNIN_USER_FAILED,
        payload: {
          error: e.message,
        },
      });
    }
  };
};

export const logOutUser = () => {
  return async function (dispatch) {
    dispatch({
      type: Types.LOG_OUT_USER,
    });
  };
};
