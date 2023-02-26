import React from "react";
import { useNavigate } from "react-router";
import { logOutUser } from "store/actions/auth";
import { useDispatch } from "react-redux";

const PrivateLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/");
  };
  return (
    <div className="d-flex flex-column my-0 mx-4">
      <nav className="navbar navbar-light justify-content-between">
        <p className="h3" onClick={() => navigate("/dashboard")}>
          FinTrack
        </p>
        <div>
          <button type="button" className="btn btn-link" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
      {children}
    </div>
  );
};

export default PrivateLayout;
