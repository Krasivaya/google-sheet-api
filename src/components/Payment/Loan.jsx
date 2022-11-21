import React from "react";
import "./index.scss";
import FormLayout from "./Form";

const Loan = () => {
  return (
    <div className="loan">
      <h1>Loan</h1>
      <FormLayout isLoan />
    </div>
  );
};

export default Loan;
