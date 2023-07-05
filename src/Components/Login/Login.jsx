import React from "react";
import "./login.css";
import Footer from "../UI/Footer";
import axios from "axios";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleAlt, faPlay } from "@fortawesome/free-solid-svg-icons";

const Login = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    if (enteredEmail === "" || enteredPassword === "") {
      return alert("Please enter all fields");
    }
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      const res = await axios.post("http://localhost:3000/users/login", user);
      if (res.data.success === true) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
        alert("Login successfull");
      }
    } catch (error) {
      const errMsg = error.response.data.err;
      if (errMsg === "User not found") {
        return alert("User not found");
      }
      if (errMsg === "Password do not match") {
        return alert("Incorrect Password");
      }
      console.log(errMsg);
    }
  };
  return (
    <main>
      <div className="page">
        <div className="header">
          <h1 className="logo">MandoTrack</h1>
        </div>
        <div className="container">
          <form onSubmit={submitHandler}>
            <input type="email" placeholder="Email" ref={emailRef} />
            <input type="password" placeholder="Password" ref={passwordRef} />
            <button type="submit">Log in</button>
          </form>
          <div>
            <hr />
            <p className="or">OR</p>
            <hr />
          </div>
          <button className="fab fa-facebook-square">
            Log in with Facebook
          </button>
        </div>
      </div>
      <div className="option">
        <p>
          Don't have an account?
          <a onClick={props.modeChanger}>Sign up</a>
        </p>
      </div>
      <div className="otherapps">
        <p>Get the app.</p>
        <button type="button">
          <i>
            <FontAwesomeIcon icon={faAppleAlt} />
          </i>
          App Store
        </button>
        <button type="button">
          <i>
            <FontAwesomeIcon icon={faPlay} />
          </i>{" "}
          Google Play
        </button>
      </div>
      <Footer />
    </main>
  );
};

export default Login;
