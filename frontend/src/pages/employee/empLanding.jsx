import React from "react";
import Navbar from "../../layout/navbar";
import login from "../../assets/login.svg";
// import "./manager.css";

function EmpLanding() {
  const githubURL = "https://github.com/aishrt";
  const linkedinURL = "https://www.linkedin.com/in/aish-raj-tyagi/";
  return (
    <>
      <Navbar />
      <div className="row makePadding mainpage">
        <div className="col-md-5 col-5 col-sm-5">
          <div>
            <img className="sideBanner" src={login} alt="side" />
          </div>
        </div>
        <div className="col-md-6 col-6 col-sm-6">
          <div className="rightSideDiv">
            <h4>Hey!</h4>
            <h5>This project is done by Aishwarya Raj Tyagi</h5>
            <h6>
              I have made this project using Ract Js , Node js , Express ,
              Bootstrap
            </h6>
            <div className="follow row">
              <div className="col-md-2">
                <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="col-md-2">
                <a href={githubURL} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmpLanding;
