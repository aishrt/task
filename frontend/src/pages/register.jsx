import React, { useState } from "react";
import Header from "../layout/header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
function Register() {
  const [userDetail, setUserDetail] = useState({
    name: "",
    id: "",
    address: "",
    school: "",
    phone: "",
  });

  const [formError, setFormError] = useState({});

  const formValidation = (userDetail) => {
    var formError = {};
    if (!userDetail.name) {
      formError.name = "Name field is mendatory.";
    }
    // else if (!/\S+@\S+\.\S+/.test(userDetail.name)) {
    //   formError.name = "Enter valid name.";
    // }
    else if (!isNaN(userDetail.name)) {
      formError.name = "Cannot enter number in name.";
    }
    // if(userDetail.name == "@")
    // {
    //   formError.name == "Cannot enter @ invalid name";
    // }
    if (!userDetail.id) {
      formError.id = "Enter valid id";
    } else if (userDetail.id.length >= 5) {
      formError.id = "Length cannot exceed 5 digits";
    }
    if (!userDetail.address) {
      formError.address = "Enter valid address";
    }
    if (!userDetail.school) {
      formError.school = "Enter valid school";
    }
    if (!userDetail.phone) {
      formError.phone = "Enter valid contact number";
    }
    return formError;
  };
  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   let d = { ...userDetail };
  //   d[name] = value;
  //   console.log("dataaaaaa", d);
  //   setUserDetail(d);
  // };

  const handleChange = (e) => {
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();
    setFormError(formValidation(userDetail));
    console.log("Form error is : ", formError);
    if (
      userDetail.name === "" ||
      userDetail.id === "" ||
      userDetail.phone === "" ||
      userDetail.school === "" ||
      userDetail.address === "" ||
      userDetail.id.length >= 5 ||
      !isNaN(userDetail.name)
    ) {
      return toast.error("Please fill all details");
    }

    let result = await fetch("http://localhost:4004/register", {
      method: "post",

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetail),
    });
    // console.log("============", userDetail);
    result = await result.json();
    if (result.status === "success") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    console.log("Result => ", result);
  };
  return (
    <>
      <Header />
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <div className="form-div">
        <form onSubmit={handleSubmit}>
          <h3>Enter Student Data Here</h3>

          <label id="name">Name</label>
          <input
            type="text"
            value={userDetail.name}
            name="name"
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
            placeholder="Enter name here"
          />
          {formError.name && <p className="text-danger">{formError.name}</p>}

          <label id="id">ID</label>
          <input
            placeholder="Enter ID here"
            type="text"
            value={userDetail.id}
            name="id"
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
          />
          {formError.id && <p className="text-danger">{formError.id}</p>}

          <label id="address">Address</label>
          <input
            placeholder="Enter Address here"
            type="text"
            value={userDetail.address}
            name="address"
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
          />
          {formError.address && (
            <p className="text-danger">{formError.address}</p>
          )}

          <label id="school">School</label>
          <input
            placeholder="Enter School here"
            type="text"
            value={userDetail.school}
            name="school"
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
          />
          {formError.school && (
            <p className="text-danger">{formError.school}</p>
          )}

          <label id="phone">Phone Number</label>
          <input
            placeholder="Enter Phone number  here"
            type="text"
            value={userDetail.phone}
            name="phone"
            // onChange={(e) => handleChange(e)}
            onChange={handleChange}
          />
          {formError.phone && <p className="text-danger">{formError.phone}</p>}

          <input className="buttn" type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default Register;
