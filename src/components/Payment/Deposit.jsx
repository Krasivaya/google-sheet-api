import React from "react";
import "./index.scss";
import FormLayout from "./Form";

const Deposit = () => {
  return (
    <div className="deposit">
      <h1>Deposit</h1>
      <FormLayout isDeposit />
    </div>
  );
};

export default Deposit;
