import React from "react";
import { useState } from "react";
import Header from "../layout/header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Delete() {
  const [idd, setIdd] = useState({});

  const deleteData = async (e) => {
    const response = await fetch("http://localhost:4004/delete", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: idd }),
    });
    const data = await response.json();

    if (data.status === "success") {
      toast.success(data.message);
    } else {
      console.log("Result ===>", data.message);
      toast.error(data.message);
    }
  };

  return (
    <>
      <Header />
      <h4>Enter the id to be deleted</h4>
      <input
        placeholder="Enter the id to be searched"
        onChange={(e) => {
          setIdd(e.target.value);
        }}
        value={idd}
      />
      <button onClick={deleteData}>Delete Users</button>
    </>
  );
}

export default Delete;
