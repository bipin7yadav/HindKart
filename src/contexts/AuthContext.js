import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
// import { authReducer } from "../reducers";
import { useNavigate } from "react-router-dom";
// import { signupService, loginService } from "../services";
import toast from "react-hot-toast";

const initialState = {
  token: "",
  userInfo: null,
  isLoggedIn: false,
  error: "",
};

const loginService = (email, password) => {
    let response =axios.post("/api/auth/login", { email, password });
    console.log("res :",response);
    return response
  };

  export const signupService = (firstName, lastName, email, password) => {
    return axios.post("/api/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
  };

  const SAVE_TOKEN = "SAVE_TOKEN";
  const USER_IS_LOGGED_IN = "USER_IS_LOGGED_IN";
  const SAVE_USER_INFO = "SAVE_USER_INFO";
  const AUTH_ERROR = "AUTH_ERROR";
  const LOG_OUT = "LOG_OUT";

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case SAVE_TOKEN:
      return { ...state, token: payload, isLoggedIn: true, error: "" };
    case SAVE_USER_INFO:
      return { ...state, userInfo: payload };
    case AUTH_ERROR:
      return {
        ...state,
        error: payload,
        token: "",
        isLoggedIn: false,
        userInfo: {},
      };
    case LOG_OUT:
      return {
        ...state,
        token: "",
        isLoggedIn: false,
        userInfo: {},
        error: "",
      };
    default:
      return state;
  }
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("token") || "";
  const getUserFromLocalStorage =
    JSON.parse(localStorage.getItem("user")) || null;
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    if (getTokenFromLocalStorage !== "" && getUserFromLocalStorage !== "") {
      dispatch({
        type: "SAVE_TOKEN",
        payload: getTokenFromLocalStorage,
      });
      dispatch({
        type: "SAVE_USER_INFO",
        payload: getUserFromLocalStorage,
      });
    }
  }, [state.token]);

  const signupHandler = async (firstName, lastName, email, password) => {
    const toastId = toast.loading("Creating your account...");
    try {
      const { status } = await signupService(
        firstName,
        lastName,
        email,
        password
      );
      if (status === 200 || status === 201) {
        toast.success("Account created successfully!", {
          id: toastId,
        });
        navigate("/Login");
      }
    } catch (error) {
      toast.error("Some error occured. Try Again.", {
        id: toastId,
      });
      dispatch({ type: "AUTH_ERROR", payload: error.response });
    }
  };

  const loginHandler = async (email, password) => {
    const toastId = toast.loading("Logging in...");
    try {
      const {
        data: { encodedToken, foundUser },
        status,
      } = await loginService(email, password);

      console.log('====================================');
      console.log(encodedToken,foundUser,status);
      console.log('====================================');
      if (status === 200) {
        toast.success(`Hello, ${foundUser.firstName}. Welcome back!`, {
          id: toastId,
          icon: "👋",
        });
        localStorage.setItem("token", encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        dispatch({ type: "SAVE_TOKEN", payload: encodedToken });
        dispatch({
          type: "SAVE_USER_INFO",
          payload: foundUser,
        });
        // navigate(-1);
        navigate("/")
      }
    } catch (error) {
      toast.error("Some error occured. Try Again.", {
        id: toastId,
      });
      dispatch({ type: "AUTH_ERROR", payload: error.response });
    }
  };

  const logoutHandler = () => {
    const toastId = toast.loading("Logging out...");
    toast.success("You're logged out successfully", {
      id: toastId,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        signupHandler,
        loginHandler,
        logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };