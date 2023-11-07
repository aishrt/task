import React, { useState } from "react";
import Header from "../layout/header";
import { Table } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const [users, setUsers] = useState({});
  const [idd, setIdd] = useState("");
  const [naam, setNaam] = useState("");
  const [school, setSchool] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const fetchData = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4004/update", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idd,
        school: school,
        name: naam,
        address: address,
        phone: phone,
      }),
    });
    const data = await response.json();

    if (data.status === "success") {
      setUsers(data.result);
      toast.success(data.message);
    } else {
      setIdd(null);
      // window.location.reload();
      console.log("Result ===>", data.message);
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
      <input
        placeholder="Enter Name"
        onChange={(e) => {
          setNaam(e.target.value);
        }}
        value={naam}
      />
      <input
        placeholder="Enter school"
        onChange={(e) => {
          setSchool(e.target.value);
        }}
        value={school}
      />
      <input
        placeholder="Enter Address"
        onChange={(e) => {
          setAddress(e.target.value);
        }}
        value={address}
      />
      <input
        placeholder="Enter Phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        value={phone}
      />
      <button onClick={fetchData}>Update</button>

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

export default Update;
