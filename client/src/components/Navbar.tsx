import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authState } = useAuth();
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleLinkClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  return (
    <>
      <input type="checkbox" id="active" ref={checkboxRef}></input>
      <label htmlFor="active" className="menu-btn">
        <i className="fas fa-bars"></i>
      </label>
      <div className="wrapper">
        <ul>
          {authState?.authenticated ? (
            <>
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profile" onClick={handleLinkClick}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/news" onClick={handleLinkClick}>
                  News
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/news" onClick={handleLinkClick}>
                  News
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={handleLinkClick}>
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" onClick={handleLinkClick}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
