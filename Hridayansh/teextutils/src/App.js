import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Textform from "./components/Textform";
import About from "./components/About";
import React, { useState } from "react";
import Alert from "./components/Alert";
import { Routes, Route } from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#ffb3b3";
      showAlert("Dark model has been enabled", "success");
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("light model has been enabled", "success");
    }
  };
  return (
    <>
      <Navbar>
        title="TextUtils2" abouttext="aboutti" mode={mode}
        toggleMode={toggleMode}
      </Navbar>
      <Alert alert={alert}></Alert>
      <div className="container">
        <Routes>
          <Route exact path="/about" element={<About />} />
          <Route
            exact
            path="/"
            element={
              <Textform heading="Enter the text to analyze below" mode={mode} />
            }
          />
        </Routes>
        {/* <About></About> */}
      </div>
    </>
  );
}
export default App;
