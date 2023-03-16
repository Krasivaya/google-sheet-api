import React from "react";
import "./index.scss";
import FormLayout from "./Form";
import { Tabs } from "antd";

const Loan = () => {
  const items = [
    {
      key: "requestLoan",
      label: "Request Loan",
      children: <FormLayout isLoanRequest />,
    },
    {
      key: "repayLoan",
      label: "Repay Loan",
      children: <FormLayout isLoanRepayment />,
    },
  ];

  return (
    <div className="loan">
      <h1>Loan</h1>
      <Tabs defaultActiveKey="requestLoan" items={items} centered />
    </div>
  );
};

export default Loan;
