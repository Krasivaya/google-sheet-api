import axios from "axios";

const updateSheet = async ({ range, values, spreadsheetId }) => {
  await axios
    .post(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
      { values },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GOOGLE_TOKEN}`,
        },
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export default updateSheet;
