import React, { Component } from "react";
import { Link } from "react-router-dom";
const Navbar=()=>{
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand text-light" to="/">
              NewsMonkey
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/about"
                  >
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/business"
                  >
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/entertainment"
                  >
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/general"
                  >
                    General
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/health"
                  >
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/science"
                  >
                    Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/sports"
                  >
                    Sports
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active text-light"
                    aria-current="page"
                    to="/technology"
                  >
                    Technology
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }

export default Navbar;
