import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseActions } from "../Store/ExpenseSlice";
import axios from "axios";
import { Button } from "react-bootstrap";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import Stats from "../components/Stats";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthData from "../Store/AuthSlice";
import Modal from "../components/Editmodal";
const Navbar = lazy(() => import("./Navbar"));
const Hero = () => {
  const dispatch = useDispatch();
  const expensesT = useSelector((state) => state.expense.allExpenses);

  const darkMode = useSelector((state) => state.auth.theme);
  // document.getElementsByTagName('html').addAttribute("data-bs-theme="dark"")
  console.log(expensesT);
  // const Navigate = useNavigate();
  const [Amount, setAmount] = useState("");
  const [Description, setDescription] = useState("new");
  const [Category, setCategory] = useState("Rent");
  const [TableData, setTableData] = useState([]);
  const [show, setShowEditModal] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  // MODAL HIDE AND SHOW
  const handleClose = () => {
    fetchUserData();
    setShowEditModal(false);
  };
  const handleShow = () => setShowEditModal(true);

  // FETCHING DATA FROM  FIREBASE
  const fetchUserData = async () => {
    try {
      const response = await axios(
        "https://expensetracker-796b0-default-rtdb.firebaseio.com/exp.json"
      );
      if (response.status == 200) {
        if (response.data === null) {
          setTableData([]);
        }
        // console.log(response)
        else {
          setTableData(Object.entries(response.data));
          console.log(Object.entries(response.data));
          dispatch(ExpenseActions.addExpense(Object.entries(response.data)));
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
    document
      .querySelector("html")
      .setAttribute("data-bs-theme", darkMode ? "dark" : "light");
    console.log("Use effect running");
  }, [darkMode]);

  // SUBMITTING EXPENSES
  const handleExpense = async (e) => {
    e.preventDefault();

    if (Description.length === 0 || Amount.length === 0) {
      alert("enter a valid value");
    } else {
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
        console.log("expense added succesfully");
        setAmount("");
        setDescription("");
        fetchUserData();
        // dispatch(ExpenseActions.addExpense(expenseData))
      } catch (err) {
        console.log(err);
      }
    }
  };
  // EDITING EXPENSES
  const editExp = (id) => {
    console.log("editingIndex", id);
    setEditItemId(id);
    setShowEditModal(true);
  };
  // DELETING EXPENSE
  const deleteExp = async (id) => {
    try {
      const response = await axios.delete(
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/exp/${id}.json`
      );
      console.log(response);
      console.log("Expense Deleted Successfully");
      // dispatch(ExpenseActions.deleteExpense(id))
      fetchUserData();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <Navbar />
      <Stats />
      {show && (
        <Modal
          handleClose={handleClose}
          handleShow={handleShow}
          itemDet={editItemId}
        />
      )}
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
                    type="number"
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

            <Button type="submit" className=" btn-info mt-3">
              Submit
            </Button>
            <div className="clearfix"></div>
          </form>
        </div>
      </div>
      {/* </div> */}
      <div className="strpied-tabled-with-hover card ">
        <div className="card-header">
          <h4 className="card-title">Your Expenses</h4>
        </div>
        <div className="table-full-width table-responsive  card-body">
          {TableData.length === 0 && <h3>no data available</h3>}
          <table className="table-hover table-striped table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {TableData.map((item) => (
                <tr key={item[0]}>
                  <td>{item[1].Description}</td>
                  <td>${item[1].Amount}</td>
                  <td>{item[1].Category}</td>
                  <td>
                    <PencilSquare
                      size={20}
                      onClick={() => editExp(item)}
                      style={{ cursor: "pointer" }}
                    />
                    <Trash
                      size={20}
                      className="ms-3"
                      color="red"
                      onClick={() => deleteExp(item[0])}
                      style={{ cursor: "pointer" }}
                    />
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
