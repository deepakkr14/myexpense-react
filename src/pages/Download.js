import React, { useContext, useState } from "react";
import { DatabaseDown } from "react-bootstrap-icons";
import { Container } from "react-bootstrap";
import { UseSelector, useSelector } from "react-redux";
import { CSVLink } from "react-csv";

const Downloadi = () => {
  const expenseCtxA=useSelector(state=>state.expense.allExpenses);
const extractData = expenseCtxA.map(item => item[1]);
console.log(extractData)

  return (
    <Container>
      <CSVLink data={extractData} filename="data.csv">
        Download CSV <DatabaseDown size={20}  />
      </CSVLink>

      {/* <a href={downloadUrl}  download="expenseActions.json"  className="btn-slide2">
    <span className="title2"><DatabaseDown size={20}onClick={generateDownloadUrl}/> Download</span>
    </a> */}
    </Container>
  );
};

export default Downloadi;
