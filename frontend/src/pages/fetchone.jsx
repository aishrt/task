import React, { useState } from "react";
import Header from "../layout/header";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fetchone = () => {
  const api = process.env.REACT_APP_API_URL;
  const [users, setUsers] = useState({});
  const [idd, setIdd] = useState("");
  const fetchData = async (e) => {
    e.preventDefault();
    const response = await fetch(`${api}oneData`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idd }),
    });
    const data = await response.json();

    if (data.status === "success") {
      setUsers(data.result);
      toast.success(data.message);
    } else {
      setIdd(null);
      // window.location.reload();
      toast.error(data.message);
    }
    // data !== null ? setUsers(data.result) : setUsers(data.mesage);s
  };
  // console.log("name", users.name);
  return (
    <div>
      <Header />
      <input
        placeholder="Enter the id to be searched"
        onChange={(e) => {
          setIdd(e.target.value);
        }}
        value={idd}
      />
      <button onClick={fetchData}>Fetch Users</button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Roll number</th>
            <th>Name</th>
            <th>School</th>
            <th>Address</th>
            <th>Phone number</th>
          </tr>
        </thead>

        <>
          <tbody>
            {/* <h1>{users.id}</h1> */}
            {idd !== null ? (
              <tr>
                <td>{users.id}</td>
                <td>{users.name}</td>
                <td>{users.school}</td>
                <td>{users.address}</td>
                <td>{users.phone}</td>
              </tr>
            ) : (
              <tr>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
                <td>null</td>
              </tr>
            )}
          </tbody>
        </>
      </Table>
    </div>
  );
};

export default Fetchone;
