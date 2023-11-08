import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [isEmployee, setIsEmployee] = useState(false);
  const [role, setRole] = useState("Employee");
  const handleCheckboxChange = (e) => {
    setIsEmployee(e.target.checked); // Update the state based on checkbox
  };
  useEffect(() => {
    if (isEmployee) {
      setRole("Manager");
    } else if (!isEmployee) {
      setRole("Employee");
    }
  }, [isEmployee]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    role: role,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear the error message for the input field that is being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    validateForm();
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let result = "";
  const handleSubmit = async (e) => {
    console.log(role, "kllklklllklklklklk");
    e.preventDefault();
    if (validateForm()) {
      try {
        formData.role = role;
        const data = await axios.post(
          "http://localhost:4000/v1/auth/register",
          formData
        );
        result = data?.data;
        console.log(result);
        if (result.status === "200") {
          toast.success(result.message);
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

    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/)) {
      newErrors.email = "Invalid email address";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/[a-zA-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain at least one letter";
    } else if (!/\d/.test(formData.password)) {
      newErrors.password = "Password must contain at least one number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <div className="container">
        <div className="row form-main regDivz">
          <div className="formDiv shadow">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div>
                  <label for="first_name">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.first_name}</span>
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.last_name}</span>
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.phone_number}</span>
                </div>
                <div>
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.location}</span>
                </div>
                <div>
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.department}</span>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.email}</span>
                </div>
                <div>
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.password}</span>
                </div>
                <div className="checkboxDiv">
                  <input
                    type="checkbox"
                    name="isEmployee"
                    checked={isEmployee}
                    onChange={handleCheckboxChange}
                  />
                  <label>Want to register as manager !</label>
                </div>
              </div>
              <div className="row button-div">
                <button className="button-css" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
          <p className="linkText" onClick={() => navigate("/login")}>
            Already a user , Login!
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
