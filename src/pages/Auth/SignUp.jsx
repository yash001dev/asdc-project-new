import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import cs from "classnames";

import showPasswordIcon from "assets/icons/show-password-icon.svg";
import hidePasswordIcon from "assets/icons/hide-password-icon.svg";
import style from "./index.module.css";

const baseURL = process.env.REACT_APP_BASE_URL;

const SignUp = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [validation, setValidation] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [showPassword, setShowPassword] = useState({ password: false, cpassword: false });
  const handleSignUp = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = {
      firstName: userDetails.fname,
      lastName: userDetails.lname,
      email: userDetails.email,
      password: userDetails.password,
    };
    try {
      const { status } = await axios.post(`${baseURL}/user/signup`, data);
      if (status === 201) {
        setUserDetails({
          fname: "",
          lname: "",
          email: "",
          password: "",
          cpassword: "",
        });
        navigate("/");
      }
    } catch (e) {
      console.log(e.message);
    }
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
        else if (userDetails.cpassword.length > 0 && value !== userDetails.cpassword)
          setValidation({
            ...validation,
            [name]: "Password doesn't match",
          });
        else
          setValidation({
            ...validation,
            [name]: "",
          });
        break;
      case "cpassword":
        if (value !== userDetails.password)
          setValidation({
            ...validation,
            [name]: "Password doesn't match",
          });
        else
          setValidation({
            ...validation,
            [name]: "",
          });
        break;
      default:
        if (value.length < 0)
          setValidation({ ...validation, [name]: `${name} should be appropriate` });
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
        <div className="card-header fw-semibold">SignUp Page</div>
        <div className="card-body">
          <form onSubmit={handleSignUp}>
            <div className="form-group mt-2">
              <label htmlFor="fname" className="d-flex mb-1">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="fname"
                name="fname"
                placeholder="Enter first name"
                value={userDetails.fname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="lname" className="d-flex mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lname"
                name="lname"
                placeholder="Enter last name"
                value={userDetails.lname}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
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
                type={showPassword.password ? "text" : "password"}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter password"
                value={userDetails.password}
                onChange={handleChange}
              />
              <div className={cs("position-absolute", style.passwordIcon)}>
                {showPassword.password ? (
                  <img
                    src={hidePasswordIcon}
                    onClick={() => setShowPassword({ ...showPassword, password: false })}
                  />
                ) : (
                  <img
                    src={showPasswordIcon}
                    onClick={() => setShowPassword({ ...showPassword, password: true })}
                  />
                )}
              </div>
            </div>
            <div className="form-group my-2 position-relative">
              <label htmlFor="cpassword" className="d-flex mb-1">
                Confirm Password
              </label>
              <input
                type={showPassword.cpassword ? "text" : "password"}
                className="form-control"
                id="cpassword"
                name="cpassword"
                placeholder="Enter confirm password"
                value={userDetails.cpassword}
                onChange={handleChange}
              />
              <div className={cs("position-absolute", style.passwordIcon)}>
                {showPassword.cpassword ? (
                  <img
                    src={hidePasswordIcon}
                    onClick={() => setShowPassword({ ...showPassword, cpassword: false })}
                  />
                ) : (
                  <img
                    src={showPasswordIcon}
                    onClick={() => setShowPassword({ ...showPassword, cpassword: true })}
                  />
                )}
              </div>
            </div>
            <div className="d-flex flex-column align-items-baseline my-2">
              <p className="m-0">Password must contain:</p>
              <ul className="d-flex flex-column align-items-baseline mb-0">
                <li>a lower case character</li>
                <li>a upper case character</li>
                <li>a number</li>
                <li>a special character</li>
              </ul>
            </div>
            <button type="submit" className="btn btn-primary mt-2" disabled={disabledCondition}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
