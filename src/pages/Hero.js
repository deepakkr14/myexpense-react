import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { Key, PencilSquare, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Stats from "../components/Stats";
import { useState, useContext } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import expenseData from "../Store/context";
// import ProfileUpdate from "./ProfileUpdate";
const Hero = () => {
  const expenseCtx = useContext(expenseData);
  const Navigate = useNavigate();
  const [Amount, setAmount] = useState("");
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("Rent");

  let token = localStorage.getItem("token");

  const handleExpense = (e) => {
    e.preventDefault();
    const expenseData = {
      id: Math.random(),
      Description,
      Amount,
      Category,
    };
    expenseCtx.addItem(expenseData);
    console.log(expenseCtx.items);
    console.log(expenseData);
    setAmount("");
    setDescription("");
  };
  return (
    <Fragment>
      <Navbar />

      {/* <i className="bi bi-bar-chart text-primary" style={{ fontSize: 40 }}></i> */}
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
              className="btn-fill pull-right btn btn-info mt-3"
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
              {expenseCtx.items.map((item) => (
                <tr key={item.id}>
                  <td>{expenseCtx.items.length}</td>
                  <td>{item.Description}</td>
                  <td>${item.Amount}</td>
                  <td>{item.Category}</td>
                  <td>
                    <PencilSquare size={20} />
                    <Trash size={20} className="ms-3" color="red" />
                  </td>
                </tr>
              ))}
            
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
