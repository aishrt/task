// import React, { useState } from "react";
// import Header from "../layout/header";
// import { Table } from "react-bootstrap";

// const Fetch = () => {
//   const [users, setUsers] = useState([]);

//   const fetchData = async () => {
//     const response = await fetch("http://localhost:4004/alldata");
//     const data = await response.json();
//     setUsers(data);
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   return (
//     <div>
//       <Header />

//       <button onClick={fetchData}>Fetch Users</button>
//       {users.length > 0 && (
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Roll number</th>
//               <th>Name</th>
//               <th>School</th>
//               <th>Address</th>
//               <th>Phone number</th>
//             </tr>
//           </thead>

//           {users.map((user) => (
//             <>
//               <tbody>
//                 <tr>
//                   <td key={user._id}>{user.id}</td>
//                   <td key={user._id}>{user.name}</td>
//                   <td key={user._id}>{user.school}</td>
//                   <td key={user._id}>{user.phone}</td>
//                   <td key={user._id}>{user.address}</td>
//                 </tr>
//               </tbody>
//             </>
//           ))}
//         </Table>
//       )}
//     </div>
//   );
// };

// export default Fetch;
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Header from "../layout/navbar";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Fetch() {
  const [datas, setDatas] = useState([]);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState({});

  // const [users, setUsers] = useState({});
  const [idd, setIdd] = useState("");
  const [naam, setNaam] = useState("");
  const [school, setSchool] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = async (id) => {
    setShow(true);
    const response = await fetch(`http://localhost:4004/oneData`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await response.json();

    setUsers(data.result);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4004/update", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: users.id,
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
      toast.error(data.message);
    }
    window.location.reload();
  };

  async function handleDelete(id) {
    var deleteApi = await fetch("http://localhost:4004/delete", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    deleteApi = await deleteApi.json();
    if (deleteApi.status === "success") {
      toast.success(deleteApi.message);
    } else {
      toast.error(deleteApi.message);
    }
  }
  async function fetchData() {
    var fetchApi = await fetch("http://localhost:4004/alldata", {
      method: "GET",
    });
    fetchApi = await fetchApi.json();
    setDatas(fetchApi);
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone,
    },
    {
      name: "School",
      selector: (row) => row.school,
    },
    {
      name: "Update",
      selector: (row) => (
        <button onClick={() => handleShow(row.id)}>Update</button>
      ),
    },
    {
      name: "Delete",
      selector: (row) => (
        <button onClick={() => handleDelete(row.id)}>Delete</button>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <lable>Id</lable>
            <input
              placeholder={users.id}
              // onChange={(e) => {
              //   setIdd(e.target.value);
              // }}
              value={users.id}
            />
            <br />
            <lable>Name</lable>
            <input
              placeholder={users.name}
              onChange={(e) => {
                setNaam(e.target.value);
              }}
              value={naam}
            />
            <br />
            <lable>Adress</lable>
            <input
              placeholder={users.address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
            <br />
            <lable>Phone </lable>
            <input
              placeholder={users.phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
            />
            <br />
            <lable>School</lable>
            <input placeholder={users.school} />
            <br />
            <button onClick={handleUpdate}>Update</button>
          </form>
        </Modal.Body>
      </Modal>

      {/* <button onClick={fetchData}>Fetch data from here</button> */}
      <DataTable pagination columns={columns} data={datas} />
    </>
  );
}

export default Fetch;
