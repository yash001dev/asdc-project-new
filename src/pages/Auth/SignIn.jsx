import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { loginUser } from "store/actions/auth";
import showPasswordIcon from "assets/icons/show-password-icon.svg";
import hidePasswordIcon from "assets/icons/hide-password-icon.svg";
import style from "./index.module.css";
import cs from "classnames";

const SignIn = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [validation, setValidation] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    await dispatch(loginUser(userDetails));
    setUserDetails({
      email: "",
      password: "",
    });
    navigate("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    checkValidation(name, value);
  };

  const checkValidation = (name, value) => {
    const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    switch (name) {
      case "password":
        if (!regex.test(value))
          setValidation({
            ...validation,
            [name]:
              "Password should contain atleast one number, one lower case character, one upper case character, one special character and should be greater than 8 charcters",
          });
        else
          setValidation({
            ...validation,
            [name]: "",
          });
        break;
      case "name":
      default:
        if (value.length < 0)
          setValidation({ ...validation, [name]: "Email should be appropriate" });
        else
          setValidation({
            ...validation,
            [name]: "",
          });
        break;
    }
  };

  const disabledCondition =
    Object.values(userDetails).some((ele) => ele.length === 0) ||
    Object.values(validation).some((ele) => ele);

  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <div className={cs("card", style.cardStyle)}>
        <div className="card-header fw-semibold">Login Page</div>
        <div className="card-body">
          <form onSubmit={handleSignIn}>
            <div className="form-group mt-2">
              <label htmlFor="email" className="d-flex mb-1">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={userDetails.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2 position-relative">
              <label htmlFor="password" className="d-flex mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={userDetails.password}
                onChange={handleChange}
              />
              <div className={cs("position-absolute", style.passwordIcon)}>
                {showPassword ? (
                  <img src={hidePasswordIcon} onClick={() => setShowPassword(false)} />
                ) : (
                  <img src={showPasswordIcon} onClick={() => setShowPassword(true)} />
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={disabledCondition}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
