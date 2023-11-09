import React, { useEffect, useState } from "react";
import Navbar from "../../layout/navbar";
import kyc from "../../assets/kyc.png";
import "./manager.css";
import axios from "axios";
import { toast } from "react-toastify";
import "../auth/auth.css";
import { useNavigate } from "react-router-dom";

function ManagerProfile() {
  const user = localStorage.getItem("user");
  const userDat = JSON.parse(user);
  const [userData, setData] = useState();
  const id = userDat?.id;
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    const apiUrl = `http://localhost:4000/v1/manager/getOneEmployee/${id}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const [find, setFind] = useState(false);
  const [show, setShow] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        first_name: userData?.first_name || "",
        last_name: userData?.last_name || "",
        phone_number: userData?.phone_number || "",
        email: userData?.email || "",
        location: userData?.location || "",
        department: userData?.department || "",
      });
    }
  }, [userData]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the error message for the input field that is being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    if (find === true) {
      validateForm();
    }
  }, [find]);

  let result = "";
  const handleSubmit = async (e) => {
    setFind(true);
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await axios.post(
          `http://localhost:4000/v1/manager/updateEmployee/${id}`,
          formData
        );
        result = data?.data;
        fetchData();
        if (result.status === "200") {
          fetchData();
          toast.success(result.message);
          setShow(false);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error(result.message);
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name) {
      newErrors.first_name = "First Name is required";
    } else if (/\d/.test(formData.first_name)) {
      newErrors.first_name = "First Name should not contain numbers";
    }

    if (!formData.last_name) {
      newErrors.last_name = "Last Name is required";
    } else if (/\d/.test(formData.last_name)) {
      newErrors.last_name = "Last Name should not contain numbers";
    }
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    if (!formData.department) {
      newErrors.department = "Department is required";
    } else if (/\d/.test(formData.department)) {
      newErrors.department = "Department Name should not contain numbers";
    }
    if (!formData.phone_number) {
      newErrors.phone_number = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      newErrors.phone_number =
        "Phone Number should contain exactly 10 digits and no other characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <Navbar />
      <div className="row makePadding mainpage">
        <div className="col-md-5 col-5 col-sm-5">
          <div>
            <img className="sideBanner" src={kyc} alt="side" />
          </div>
        </div>
        <div className="col-md-7 col-7 col-sm-7">
          {!show ? (
            <div className="rightSideDiv">
              <h3>
                Welcome{" "}
                <span className="newStyle"> {userData?.first_name} </span>
                <span className="newStyle"> {userData?.last_name}</span>
              </h3>
              <h5>
                You are an <span className="newStyle">{userData?.role}</span> ,
                in our Organization holding responsibility of{" "}
                <span className="newStyle">{userData?.department} </span>
                department
              </h5>
              <h6 className="mt-4">
                <ul>
                  <li>Address : {userData?.location}</li>
                  <li>Email : {userData?.email}</li>
                  <li>Phone Number : {userData?.phone_number}</li>
                </ul>
              </h6>
            </div>
          ) : (
            <div className="formDiv maxWidth">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <label for="first_name">First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={
                        formData.first_name
                          ? formData?.first_name
                          : userData?.first_name
                      }
                      onChange={handleChange}
                    />
                    <span className="error">{errors.first_name}</span>
                  </div>
                  <div className="col-md-6">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={
                        formData.last_name
                          ? formData?.last_name
                          : userData?.last_name
                      }
                      onChange={handleChange}
                    />
                    <span className="error">{errors.last_name}</span>
                  </div>
                  <div className="col-md-6">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={
                        formData.phone_number
                          ? formData?.phone_number
                          : userData?.phone_number
                      }
                      onChange={handleChange}
                    />
                    <span className="error">{errors.phone_number}</span>
                  </div>
                  <div className="col-md-6">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      value={
                        formData.location
                          ? formData?.location
                          : userData?.location
                      }
                      onChange={handleChange}
                    />
                    <span className="error">{errors.location}</span>
                  </div>
                  <div className="col-md-6">
                    <label>Department</label>
                    <input
                      type="text"
                      name="department"
                      value={
                        formData.department
                          ? formData?.department
                          : userData?.department
                      }
                      onChange={handleChange}
                    />
                    <span className="error">{errors.department}</span>
                  </div>
                  <div className="col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      disabled
                      value={userData?.email}
                      onChange={handleChange}
                    />
                    <span className="error">{errors.email}</span>
                  </div>
                </div>
                <div className="row button-div">
                  <button className="button-css" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <button className="editButton" onClick={() => setShow(true)}>
        {" "}
        <i className="fa-solid fa-user-pen"></i>
      </button>
    </div>
  );
}

export default ManagerProfile;
