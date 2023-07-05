import moment from "moment";

export const getCurrentLocaleDateAsString = (): string => {
  const now = moment().format("YYYY-MM-DD HH:mm:ss");

  return now;
};
