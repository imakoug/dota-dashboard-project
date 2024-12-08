import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">&nbsp;Home</Link>
        </li>
        <li>
          <Link to="/profile">Users</Link>
        </li>
        <li>
          <Link to="/createUser">Add user</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
