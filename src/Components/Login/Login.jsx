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
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const user = {
      email: enteredEmail,
      password: enteredPassword,
    };
    try {
      axios.post("http://localhost:3000/users/login", user);
    } catch (error) {
      console.log(error);
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
