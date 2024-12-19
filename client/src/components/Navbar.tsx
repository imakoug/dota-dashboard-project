import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
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
          <li>
            <Link to="/" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/profile" onClick={handleLinkClick}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/createUser" onClick={handleLinkClick}>
              Add User
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
