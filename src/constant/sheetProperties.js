const valueFormat = {
  backgroundColor: {
    red: 18,
    green: 87,
    blue: 140,
  },
};

export const dataProperties = {
  deposit: [
    {
      rowData: [
        {
          values: [
            {
              userEnteredValue: {
                stringValue: "Amount",
              },
              userEnteredFormat: valueFormat,
            },
            {
              userEnteredValue: {
                stringValue: "Issued Date",
              },
              userEnteredFormat: valueFormat,
            },
          ],
        },
      ],
    },
  ],
  loan: [
    {
      rowData: [
        {
          values: [
            {
              userEnteredValue: {
                stringValue: "Amount",
              },
              userEnteredFormat: valueFormat,
            },
            {
              userEnteredValue: {
                stringValue: "Repayment Days",
              },
              userEnteredFormat: valueFormat,
            },
            {
              userEnteredValue: {
                stringValue: "Issued Date",
              },
              userEnteredFormat: valueFormat,
            },
          ],
        },
      ],
    },
  ],
};
