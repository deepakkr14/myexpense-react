import { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";

function EditModal(props) {
  const [Amount, setAmount] = useState(props.itemDet[1].Amount);
  const [Description, setDescription] = useState(props.itemDet[1].Description);
  const [Category, setCategory] = useState(props.itemDet[1].Category);
  const userId = useSelector((state) => state.auth.userId);
  const target=userId.split("@")[0];


  const submitUpdate = async () => {
    const expenseData = {
      id: Math.random(),
      Description,
      Amount,
      Category,
    };
    try {
    await axios.put(
        `https://expensetracker-796b0-default-rtdb.firebaseio.com/${target}/exp/${props.itemDet[0]}.json`,
        expenseData
      );
      console.log("Expense Edited Successfully");
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal show={props.handleShow} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                    defaultValue={Category}
                  >
                    <option value="Rent">Rent</option>
                    <option value="Fees">fees</option>
                    <option value="Foods">foods</option>
                    <option value="Entertainment">entertainment</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="clearfix"></div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
