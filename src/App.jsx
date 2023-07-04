import { useState } from "react";
import "./App.css";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";

function App() {
  const [mode, setMode] = useState(true);
  const modeHandler = () => {
    setMode((prev) => !prev);
  };
  return (
    <>
      {mode === true && <Login modeChanger={modeHandler} />}
      {mode === false && <Signup modeChanger={modeHandler} />}
    </>
  );
}

export default App;
