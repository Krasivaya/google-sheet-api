export const numberFormat = (value) =>
  value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const numberParser = (value) => value.replace(/\$\s?|(,*)/g, "");
