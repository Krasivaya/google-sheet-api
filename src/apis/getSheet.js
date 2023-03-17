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

export const getSheetForUser = async ({ spreadsheetId, range, email }) => {
  let sheetId = null;

  await axios
    .get(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?majorDimension=COLUMNS&ranges=${range}&valueRenderOption=FORMULA&key=${process.env.REACT_APP_API_KEY}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_TOKEN}`,
        },
      }
    )
    .then((res) => {
      const cols = res?.data?.valueRanges?.[0]?.values;

      const SPREADSHEET_ID = "Spreadsheet ID";
      let sheetPos;

      let userEmailPos;

      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        for (let j = 0; j < col.length; j++) {
          const row = col[j];
          if (row === SPREADSHEET_ID) sheetPos = i;
          if (row === email) userEmailPos = j;
        }
      }

      sheetId = cols[sheetPos][userEmailPos];
    })
    .catch((error) => console.log("Get Sheet: ", error));

  return sheetId;
};

export default getRangesTotal;
