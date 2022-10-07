import React, { useState } from "react";

export default function Textform(props) {
  const handleUpClick = () => {
    //console.log("Uppercase was clicked");
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted to Upper case", "success");
  };

  const handleLoClick = () => {
    //console.log("Uppercase was clicked");
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to lower case", "success");
  };

  const handleSpClick = () => {
    //console.log("On change");
    let s = "";
    for (let i = 0; i < text.length; i++) {
      if (text[i] != " ") {
        s += text[i];
      }
    }
    setText(s);
  };

  const handleOnChange = (event) => {
    //console.log("On change");
    setText(event.target.value);
  };

  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "#ffe6e6" : "white",
              color: props.mode === "dark" ? "grey" : "#042743",
            }}
            id="mybox"
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-danger mx-1" onClick={handleUpClick}>
          Convert To upper Case
        </button>
        <button className="btn btn-danger mx-1" onClick={handleLoClick}>
          Convert To lower Case
        </button>
        <button className="btn btn-danger mx-1" onClick={handleSpClick}>
          Remove spaces
        </button>
      </div>
      <div
        className="container my-3"
        style={{ color: props.mode === "dark" ? "white" : "#042743" }}
      >
        <h1>Your text summary</h1>
        <p>
          {" "}
          {text.split(" ").length} words and {text.length} charcters
        </p>
        <p>{0.008 * text.split(" ").length} Minitues to read</p>
        <h2>Preview</h2>
        <p>{text}</p>
      </div>
    </>
  );
}
