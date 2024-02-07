import React from 'react'
import {
    Wallet2,
    CurrencyRupee,
    Bank,
  } from "react-bootstrap-icons";
// import "bootstrap-icons/font/bootstrap-icons.css";

const Stats = () => {
  return (
    <div className="row mt-3">
    <div className="col-lg-3 col-sm-6">
      <div className="card-stats card">
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center icon-warning">
                <CurrencyRupee size={70} />
              </div>
            </div>
            <div className="col-7">
              <div className="numbers">
                <p className="card-category">Expenses</p>
                <h4 className="card-title">150</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-sm-6">
      <div className="card-stats card">
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center icon-warning">
                <CurrencyRupee size={70} />
              </div>
            </div>
            <div className="col-7">
              <div className="numbers">
                <p className="card-category">Income</p>
                <h4 className="card-title">$ 1,345</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-sm-6">
      <div className="card-stats card">
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center icon-warning">
                <Wallet2 size={70} />
              </div>
            </div>
            <div className="col-7">
              <div className="numbers">
                <p className="card-category">Balance</p>
                <h4 className="card-title">23</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-sm-6">
      <div className="card-stats card">
        <div className="card-body">
          <div className="row">
            <div className="col-5">
              <div className="icon-big text-center icon-warning">
                <Bank size={70} color="#d92323" />
              </div>
            </div>
            <div className="col-7">
              <div className="numbers">
                <p className="card-category">Bonus</p>
                <h4 className="card-title">+45K</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Stats
