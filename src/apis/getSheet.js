import axios from "axios";

const getRangesTotal = async ({ spreadsheetId, ranges }) => {
  let balance = 0;
  await axios
    .get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?majorDimension=COLUMNS&ranges=${ranges}&valueRenderOption=FORMULA&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_TOKEN}`,
        },
      }
    )
    .then((res) => {
      res?.data?.valueRanges?.[0]?.values?.[0]?.map(
        (amount) => (balance = balance + amount)
      );
    })
    .catch((error) => console.log("Get Sheet: ", error));
  return balance;
};

export const getAllUsers = async ({ spreadsheetId, ranges }) => {
  let users;

  await axios
    .get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?majorDimension=COLUMNS&ranges=${ranges}&valueRenderOption=FORMULA&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_TOKEN}`,
        },
      }
    )
    .then((res) => {
      users = res?.data?.valueRanges?.[0]?.values?.[0];
    })
    .catch((error) => console.log("Get Sheet: ", error));

  return users || [];
};

export default getRangesTotal;
