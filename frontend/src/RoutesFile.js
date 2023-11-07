import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import Register from "./pages/register";
import Fetch from "./pages/fetch";
import Update from "./pages/update";
import Fetchone from "./pages/fetchone";
import Delete from "./pages/delete";
import Updatedata from "./pages/updatedata";
import RegistrationForm from "./pages/RegistrationForm";

function RoutesFile() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reg" element={<RegistrationForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/fetch" element={<Fetch />} />
          <Route path="/fetchone" element={<Fetchone />} />
          <Route path="/update" element={<Update />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/updateed" element={<Updatedata />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default RoutesFile;
