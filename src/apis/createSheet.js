import axios from "axios";
import moment from "moment";
import { dataProperties } from "../constant/sheetProperties";

const createSheet = async ({ user, token }) => {
  await axios
    .post(
      `https://sheets.googleapis.com/v4/spreadsheets?key=${process.env.REACT_APP_API_KEY}`,
      {
        properties: {
          title: `${user} (${moment().format("llll")})`,
        },
        sheets: [
          {
            properties: {
              title: "Deposit",
            },
            data: dataProperties.deposit,
          },
          {
            properties: {
              title: "Loan",
            },
            data: dataProperties.loan,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${
            process.env.REACT_APP_GOOGLE_TOKEN || token
          }`,
        },
      }
    )
    .then((res) =>
      localStorage.setItem("spreadsheetId", res.data.spreadsheetId)
    )
    .catch((err) => console.log(err));
};

export default createSheet;
