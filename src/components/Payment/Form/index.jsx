/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Form,
  Input,
  InputNumber,
  notification,
  Space,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import getRangesTotal from "../../../apis/getSheet";
import updateSheet from "../../../apis/updateSheet";
import { numberFormat, numberParser } from "../../../utilities/formatter";

const FormLayout = ({
  isLoanRequest = false,
  isLoanRepayment = false,
  isDeposit = false,
}) => {
  const [data, setData] = useState({});
  const [balance, setBalance] = useState(0);
  const [disableBtn, setDisableBtn] = useState(true);
  const [loading, setLoading] = useState(false);
  const spreadsheetId = process.env.REACT_APP_OVERALL_SHEET_ID;
  const currentUser = localStorage.getItem("current_user");

  const verifyData = ({ amount = 0, days = 0, receipt = 10_000 }) => {
    if (isLoanRequest) {
      if (amount > 0 && days > 0) return setDisableBtn(false);
      return setDisableBtn(true);
    }
    if (amount > 0 && receipt > 10_000) return setDisableBtn(false);
    return setDisableBtn(true);
  };

  const onChange = (value) => {
    setData({ ...data, amount: value });
    verifyData({ amount: value, days: data?.repayment_days });
  };

  const handleChange = async (e) => {
    const { value, name } = e?.target;
    setData({ ...data, [name]: Number(value) });

    if (name === "repayment_days")
      return verifyData({
        amount: data?.amount,
        days: value,
        receipt: data?.receipt_number,
      });

    if (name === "receipt_number")
      return verifyData({
        amount: data?.amount,
        days: data?.repayment_days,
        receipt: value,
      });
  };

  const notify = (type = "success") => {
    notification[type]({
      message: isLoanRequest ? "Loan Request" : "Saving",
      description: isLoanRequest
        ? "Your loan request was successfull"
        : "Deposit was successfull",
    });
  };

  const calcTotalBalance = async (ranges) => {
    const outstandingBalance = await getRangesTotal({
      spreadsheetId,
      ranges,
    });

    return outstandingBalance;
  };

  const handleSubmit = async () => {
    let range, values;

    setLoading(true);

    if (isLoanRepayment || isLoanRequest) {
      range = "Loan!A1:C1";
      values = [
        data?.amount,
        isLoanRequest ? "loan request" : "loan repayment",
        data?.repayment_days || 0,
        data?.repayment_date || 0,
        data?.installment || 0,
        data?.amount,
        (await calcTotalBalance("Loan!A2:A1000")) + data?.amount,
        moment().format("lll"),
        currentUser,
      ];
    } else {
      range = "Deposit!A2:B2";
      values = [
        data?.amount,
        data?.receipt_number,
        (await calcTotalBalance("Deposit!A2:A1000")) + data?.amount,
        moment().format("lll"),
        currentUser,
      ];
    }

    await updateSheet({
      spreadsheetId,
      range,
      values: [values],
    });

    setTimeout(() => {
      setLoading(false);

      notify();
    }, 1_000);
  };

  useEffect(() => {
    setLoading(true);

    calcTotalBalance("Loan!F2:F1000").then((amount) => setBalance(amount));

    setTimeout(() => {
      setLoading(false);
    }, 1_000);
  }, []);

  return (
    <Space direction="vertical">
      {(isLoanRequest || isLoanRepayment) && (
        <>
          {loading ? (
            <Spin />
          ) : balance > 0 ? (
            <Typography.Text type="warning" strong>
              You have an outstanding loan of ${balance}
            </Typography.Text>
          ) : (
            <></>
          )}
        </>
      )}
      <Form.Item
        label="Amount"
        name="amount"
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
      {(isDeposit || isLoanRepayment) && (
        <Form.Item
          label="Receipt number"
          name="receiptNumber"
          rules={[
            {
              required: true,
              message: "Receipt number is required",
            },
          ]}
        >
          <Input
            name="receipt_number"
            type="number"
            placeholder="Eg: 00100352323900"
            min={10000}
            onChange={handleChange}
          />
        </Form.Item>
      )}
      {isLoanRequest && (
        <>
          <Form.Item
            label="Repayment Days"
            name="repaymentDays"
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
          <Form.Item label="Repayment Date" name="repaymentDate">
            <Input
              name="repayment_date"
              addonAfter="Day"
              type="number"
              placeholder="Eg: 12"
              min={1}
              max={31}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Installment(s)" name="installment">
            <Input
              name="installment"
              type="number"
              placeholder="Eg: 2"
              min={1}
              max={12}
              onChange={handleChange}
            />
          </Form.Item>
        </>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          onClick={handleSubmit}
          disabled={disableBtn}
          loading={loading}
          block
        >
          Submit
        </Button>
      </Form.Item>
    </Space>
  );
};

export default FormLayout;
