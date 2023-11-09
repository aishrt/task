import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/navbar";

function EmployeeList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState();
  const [sortOrder, setSortOrder] = useState(1);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      navigate(`/employee-update/${id}`);
    }
  }, [id]);
  const handleSortFieldChange = (event) => {
    setSortField(event.target.value);
  };
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  const [total, setTotal] = useState(0);

  const perPage = 10;

  useEffect(() => {
    fetchData();
  }, [page, sortField, sortOrder]);

  const fetchData = () => {
    const apiUrl = `http://localhost:4000/v1/manager/employeeList?page=${page}&sortField=${sortField}&sortOrder=${sortOrder}`;

    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data.data);
        setTotal(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const totalPages = Math.ceil(total / perPage);
  // const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="row makePadding">
          <h3>Employee List</h3>
          <div className="row sortSelect">
            <div className="col-md-2">
              {/* <label htmlFor="sortField">Select type</label> */}
              <select
                id="sortField"
                value={sortField}
                onChange={handleSortFieldChange}
              >
                <option value="">Select sort type</option>
                <option value="first_name">Name</option>
                <option value="location">Location</option>
              </select>
            </div>
            <div className="col-md-2">
              {/* <label htmlFor="sortField">Select Order</label> */}
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <option value="">Select order</option>
                <option value="1">A-Z</option>
                <option value="-1">Z-A</option>
              </select>
            </div>
          </div>
          <div className="tableMainDiv">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>First Name</th>
                  <th>Phone no.</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Department</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{(page - 1) * perPage + index + 1}</td>
                    <td>
                      {employee.first_name} {employee.last_name}
                    </td>
                    <td>{employee.phone_number}</td>
                    <td>{employee.email}</td>
                    <td>{employee.location}</td>
                    <td>{employee.department}</td>
                    <td>
                      <>
                        <button
                          className="tableInBtn"
                          onClick={() => setId(employee.id)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        {/* <button className="tableInBtn">
                          <i className="fa-solid fa-trash-can"></i>
                        </button> */}
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="paginationButtonDiv">
              <button
                className="arrowBtn"
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                <i class="fa-regular fa-square-caret-left"></i>
              </button>
              {/* {pageNumbers.map((pageNumber) => (
          <button
            className="numBtn"
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))} */}
              <button className="numBtn" onClick={() => handlePageChange(page)}>
                {page}
              </button>
              <button
                className="arrowBtn"
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
              >
                <i class="fa-regular fa-square-caret-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeList;
