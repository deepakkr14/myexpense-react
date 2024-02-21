import React from "react";
import { PencilSquare, Trash } from "react-bootstrap-icons";

const recTable = (props) => {
  console.log(props.data)
  return (
    <div>
      <div className="strpied-tabled-with-hover card m-4">
        <div className="card-header">
          <h4 className="card-title">Your Expenses</h4>
        </div>
        <div className="table-full-width table-responsive  card-body">
          {props.data.length === 0 && <h3>no data available</h3>}
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
              {props.data.map((item) => (
                <tr key={item[0]}>
                  <td>{item[1].Description}</td>
                  <td>${item[1].Amount}</td>
                  <td>{item[1].Category}</td>
                  <td>
                    <PencilSquare
                      size={20}
                      onClick={() => props.edit(item)}
                      style={{ cursor: "pointer" }}
                    />
                    <Trash
                      size={20}
                      className="ms-3"
                      color="red"
                      onClick={() => props.delete(item[0])}
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
    </div>
  );
};

export default recTable;
