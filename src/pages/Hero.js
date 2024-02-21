import React, { Fragment, lazy, Suspense, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ExpenseActions } from "../Store/ExpenseSlice";
import axios from "axios";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Stats from "../components/Stats";
import Charts from "../components/chart";
import RecTable from "../components/recTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Toast from '../components/Toast'
import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AuthData from "../Store/AuthSlice";
import Modal from "../components/Editmodal";
const Navbar = lazy(() => import("./Navbar"));
const Hero = () => {
  const dispatch = useDispatch();
  const expensesT = useSelector((state) => state.expense.allExpenses);
  const darkMode = useSelector((state) => state.auth.theme);
  const userId = useSelector((state) => state.auth.userId);
  const target = userId.split("@")[0];
  // const Navigate = useNavigate();
  const [Amount, setAmount] = useState("");
  const [Description, setDescription] = useState("new");
  const [Category, setCategory] = useState("Rent");
  const [IncCategory, setIncCategory] = useState("Salary");
  const [IncAmount, setIncAmount] = useState("");
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
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/exp.json`
      );
      const response2 = await axios(
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/user.json`
        );
        console.log(response,response2)
        console.log('store',expensesT)
        if (response.status === 200) {
          if (response.data === null) {
            setTableData([]);
        }
        else {
          setTableData(Object.entries(response.data));
          dispatch(
            ExpenseActions.addExpense({
              exp: Object.entries(response.data)?Object.entries(response.data):[],
              inc: Object.entries(response2.data) ? Object.entries(response2.data) :[],
            })
          );
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

        const response = await axios.post(
          `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/exp.json`,
          expenseData
        );
        toast.success("Expense added successfully");
        setAmount("");
        setDescription("");
        fetchUserData();
        // dispatch(ExpenseActions.addExpense(expenseData))
      } catch (err) {
        console.log(err);
        toast.error(err);

      }
    }
  };
  // EDITING EXPENSES
  const editExp = (id) => {
    setEditItemId(id);
    setShowEditModal(true);
  };
  // DELETING EXPENSE
  const deleteExp = async (id) => {
    try {
      const response = await axios.delete(
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/exp/${id}.json`
      );
      console.log(response);
      toast.success("Expense deleted successfully");
      // dispatch(ExpenseActions.deleteExpense(id))
      fetchUserData();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const handleIncome = async (e) => {
    e.preventDefault();
    const IncomeData = {
      id: Math.random(),
      IncAmount,
      IncCategory,
    };
    try {
      const response = await axios.post(
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/user.json`,
        IncomeData
      );
      console.log("Income added succesfully");
      setIncAmount("");
      fetchUserData();
      // dispatch(ExpenseActions.addExpense(expenseData))
    } catch (err) {
      console.log(err);
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
      <div className="row">
        <div className="col-md-8">
          <div className="card  col m-4">
            <div className="row">
              <div className="col">
                <div className="card-header">
                  <h4 className="card-title">Add Expenses</h4>
                </div>
              </div>
              <div className="col">
                <div className="card-header">
                  <h4 className="card-title">Add Income</h4>
                </div>
              </div>
            </div>

            <div className="card-body">
              <form>
                <div className="row">
                  <div className="pr-1 col-md-6">
                    <div className="form-group">
                      <label>Expense Amount</label>
                      <input
                        placeholder="Enter Expense price"
                        type="number"
                        className="form-control"
                        value={Amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="pr-1 col-md-6">
                    <div className="form-group">
                      <label>Amount</label>
                      <input
                        placeholder="Enter Income "
                        type="number"
                        className="form-control"
                        value={IncAmount}
                        onChange={(e) => setIncAmount(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="px-1 col">
                      <div className="form-group">
                        <label>Expense Description</label>
                        <input
                          placeholder="Enter Description"
                          type="text"
                          className="form-control"
                          value={Description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="pl-1 col">
                      <div className="form-group">
                        <label>Income Category</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => setIncCategory(e.target.value)}
                        >
                          <option value="Salary">Salary</option>
                          <option value="Bonus">Bonus</option>
                          <option value="loan">loan</option>
                          <option value="other">other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pl-1 col-md-5">
                  <div className="form-group">
                    <label> Expense Category</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Rent">Rent</option>
                      <option value="Fees">fees</option>
                      <option value="Foods">foods</option>
                      <option value="EMI">EMI</option>
                      <option value="Fuel">Fuel</option>
                      <option value="Grocery">Grocery</option>
                      <option value="Home Improvent">Home Improvent</option>
                      <option value="others">others</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Button onClick={handleExpense} className=" btn-dark mt-3">
                      Add Expense
                    </Button>
                  </div>
                  <div className="col">
                    <Button onClick={handleIncome} className=" btn-dark mt-3">
                      Add Income
                    </Button>
                  </div>
                </div>
                <div className="clearfix"></div>
              </form>
            </div>
          </div>
        </div>
        <div className="col">
          <Charts data={TableData} />
        </div>
      </div>
      <RecTable data={TableData} edit={editExp} delete={deleteExp} />
    </Fragment>
  );
};

export default Hero;
