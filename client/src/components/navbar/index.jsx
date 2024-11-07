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
          <Link to="/recentMatches">Recent matches</Link>
        </li>
        <li>
          <Link to="/heroes">Most played heroes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
