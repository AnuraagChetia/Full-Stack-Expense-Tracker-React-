import React from "react";
import "./navbar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <div className="navbar">
        <h1>Mando</h1>
        <div>
          {/* <p>
            Anuraag<span>Rs 0.</span>
          </p> */}
        </div>
        <Link>Transactions</Link>
        <Link>Report</Link>
        <Link>Budget</Link>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
