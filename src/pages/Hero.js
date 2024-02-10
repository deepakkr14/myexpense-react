import React, { Fragment, lazy, Suspense, useEffect } from "react";
import axios from "axios";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Stats from "../components/Stats";
import { useState, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import expenseData from "../Store/context";
// import ProfileUpdate from "./ProfileUpdate";
const Hero = () => {
  const expenseCtx = useContext(expenseData);
  // const Navigate = useNavigate();
  const [Amount, setAmount] = useState(500);
  const [Description, setDescription] = useState("new");
  const [Category, setCategory] = useState("Rent");
  const [TableData, setTableData] = useState([]);
  // let token = localStorage.getItem("token");
  const fetchUserData = async () => {
    try {
      const response = await axios(
        "https://expensetracker-796b0-default-rtdb.firebaseio.com/exp.json"
      );
      if (response.status == 200) {
        setTableData(Object.entries(response.data));
      }
        } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserData();
    console.log("Use effect running");
  }, []);

  const handleExpense = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        id: Math.random(),
        Description,
        Amount,
        Category,
      };
      console.log(expenseData);

      const response = await axios.post(
        "https://expensetracker-796b0-default-rtdb.firebaseio.com/exp.json",
        expenseData
      );
      // console.log(response);
      console.log("expense added succesfully");
      setAmount("");
      setDescription("");
      fetchUserData();
    } catch (err) {
      console.log(err);
    }
  };
  const edit = () => {console.log('editingIndex')};
  return (
    <Fragment>
      <Navbar />
      <Stats />
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Add Expenses</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleExpense}>
            <div className="row">
              <div className="pr-1 col-md-4">
                <div className="form-group">
                  <label>Amount</label>
                  <input
                    placeholder="Enter price"
                    type="text"
                    className="form-control"
                    value={Amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="px-1 col-md-4">
                <div className="form-group">
                  <label>Description</label>
                  <input
                    placeholder="Enter Description"
                    type="text"
                    className="form-control"
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className="pl-1 col-md-4">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Rent">Rent</option>
                    <option value="Fees">fees</option>
                    <option value="Foods">foods</option>
                    <option value="Entertainment">entertainment</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn-fill  btn btn-info mt-3"
            >
              Submit
            </button>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
      {/* </div> */}

      <div className="strpied-tabled-with-hover card">
        <div className="card-header">
          <h4 className="card-title">Your Expenses</h4>
        </div>
        <div className="table-full-width table-responsive  card-body">
          <table className="table-hover table-striped table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TableData.map((item) => (
                <tr key={item[1].id}>
                  <td>{TableData.length}</td>
                  <td>{item[1].Description}</td>
                  <td>${item[1].Amount}</td>
                  <td>{item[1].Category}</td>
                  <td>
                    <PencilSquare size={20} onClick={() => edit(item.id)} />
                    <Trash size={20} className="ms-3" color="red" />
                  </td>
                </tr>
              ))}
              {/* <TableData/> */}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
