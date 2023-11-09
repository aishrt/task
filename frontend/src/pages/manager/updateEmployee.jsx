import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "../auth/auth.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../layout/navbar";
function UpdateEmployee() {
  const { id } = useParams();
  const [data, setData] = useState();

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

  const navigate = useNavigate();
  const [find, setFind] = useState(false);

  const [formData, setFormData] = useState({
    department: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData({
      ...formData,
      ["department"]: data?.department,
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;

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
  }, [find, formData]);

  let result = "";
  const handleSubmit = async (e) => {
    setFind(true);
    e.preventDefault();
    if (validateForm()) {
      try {
        const dataResponse = await axios.put(
          `http://localhost:4000/v1/manager/updateEmployee/${id}`,
          formData
        );
        result = dataResponse?.data;
        if (result.status === "200") {
          toast.success(result.message);
          navigate("/employee-list");
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

    if (!formData.department) {
      newErrors.department = "Department is required";
    } else if (/\d/.test(formData.department)) {
      newErrors.department = "Department Name should not contain numbers";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row form-main regDivz mt-5">
          <div className="formDiv shadow">
            <h2>Update Employee data</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <label for="first_name">First Name</label>
                  <input
                    disabled
                    type="text"
                    name="first_name"
                    value={data?.first_name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.first_name}</span>
                </div>
                <div className="col-md-6">
                  <label>Last Name</label>
                  <input
                    disabled
                    type="text"
                    name="last_name"
                    value={data?.last_name}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.last_name}</span>
                </div>
                <div className="col-md-6">
                  <label>Phone Number</label>
                  <input
                    disabled
                    type="tel"
                    name="phone_number"
                    value={data?.phone_number}
                    onChange={handleChange}
                  />
                  <span className="error">{errors.phone_number}</span>
                </div>
                <div className="col-md-6">
                  <label>Location</label>
                  <input
                    disabled
                    type="text"
                    name="location"
                    value={data?.location}
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
                      formData?.department
                        ? formData?.department
                        : data?.department
                    }
                    onChange={handleChange}
                  />
                  <span className="error">{errors.department}</span>
                </div>
                <div className="col-md-6">
                  <label>Email</label>
                  <input
                    disabled
                    type="email"
                    name="email"
                    value={data?.email}
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
        </div>
      </div>
    </>
  );
}

export default UpdateEmployee;
