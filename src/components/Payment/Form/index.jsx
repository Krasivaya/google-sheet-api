import { Button, Form, Input, InputNumber, notification } from "antd";
import moment from "moment";
import React, { useState } from "react";
import updateSheet from "../../../apis/updateSheet";
import { numberFormat, numberParser } from "../../../utilities/formatter";

const FormLayout = ({ isLoan = false }) => {
  const [data, setData] = useState({});
  const [disableBtn, setDisableBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const currentUser = localStorage.getItem("current_user");

  const verifyData = (amount = 0, days = 0) => {
    if (isLoan) {
      if (amount > 0 && days > 0) return setDisableBtn(false);
      return setDisableBtn(true);
    }
    if (amount > 0) return setDisableBtn(false);
    return setDisableBtn(true);
  };

  const onChange = (value) => {
    setData({ ...data, amount: value });
    verifyData(value, data?.repayment_days);
  };

  const handleChange = (e) => {
    const { value, name } = e?.target;
    setData({ ...data, [name]: Number(value) });
    verifyData(data?.amount, value);
  };

  const notify = (type = "success") => {
    notification[type]({
      message: isLoan ? "Loan Request" : "Saving",
      description: isLoan
        ? "Your loan request was successfull"
        : "Deposit was successfull",
    });
  };

  const handleSubmit = () => {
    setLoading(true);

    if (isLoan) {
      updateSheet({
        range: `Loan!A1:C1`,
        values: [
          [
            data?.amount,
            data?.repayment_days,
            moment().format("ll"),
            currentUser,
          ],
        ],
        token: process.env.REACT_APP_GOOGLE_TOKEN || token,
        spreadsheetId: process.env.REACT_APP_OVERALL_SHEET_ID,
      });
    } else {
      updateSheet({
        range: `Deposit!A2:B2`,
        values: [[data?.amount, moment().format("ll"), currentUser]],
        token: process.env.REACT_APP_GOOGLE_TOKEN || token,
        spreadsheetId: process.env.REACT_APP_OVERALL_SHEET_ID,
      });
    }

    setTimeout(() => {
      setLoading(false);

      notify();
    }, 1000);
    console.log(data);
  };
  return (
    <Form layout="vertical">
      <Form.Item
        label="Amount"
        required
        rules={[
          {
            required: true,
            message: "amount is required",
          },
        ]}
      >
        <InputNumber
          addonBefore="$"
          formatter={(value) => numberFormat(value)}
          parser={(value) => numberParser(value)}
          placeholder="Eg: 500"
          min={1}
          onChange={onChange}
        />
      </Form.Item>
      {isLoan && (
        <Form.Item
          label="Repayment Days"
          required
          rules={[
            {
              required: true,
              message: "repayment days is required",
            },
          ]}
        >
          <Input
            name="repayment_days"
            addonAfter="Days"
            type="number"
            placeholder="Eg: 24"
            min={1}
            onChange={handleChange}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          disabled={disableBtn}
          loading={loading}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormLayout;
