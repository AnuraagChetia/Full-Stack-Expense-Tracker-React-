import React from "react";
import "./navbar.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useSelector } from "react-redux";
const NavBar = () => {
  const premium = useSelector((state) => state.user.premium);
  const Razorpay = useRazorpay();
  const premiumHandler = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.get("http://localhost:3000/order/buy-premium", {
      headers: { Authorization: token },
    });
    // const razorpay = new Razorpay({ key: res.keyId });
    const options = {
      key: res.data.keyId,
      order_id: res.data.orderId,
      handler: async (response) => {
        axios.post("http://localhost:3000/order/success-premium", response, {
          headers: { Authorization: token },
        });
        alert("You are now a premium user!!");
      },
    };
    const rzp = new Razorpay(options);
    rzp.on("payment.failed", function (response) {
      console.log(response);
      axios.post("http://localhost:3000/order/failed-premium", response, {
        headers: { Authorization: token },
      });
      alert("Failed transaction");
    });
    rzp.open();
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h1>Mando</h1>
          {!premium && (
            <button className="premium" onClick={premiumHandler}>
              Buy Premium
            </button>
          )}
          {premium && <button className="premium">Premium</button>}
        </div>
        <div>
          {/* <p>
            Anuraag<span>Rs 0.</span>
          </p> */}
        </div>

        <Link>Leaderboard</Link>
        <Link>Report</Link>
        <Link>Budget</Link>
      </div>
      <Outlet />
    </>
  );
};

export default NavBar;
