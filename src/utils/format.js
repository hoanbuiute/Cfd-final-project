// utils/format.js
import moment from "moment";
import { DATE__FORMAT } from "../constants/format";


// ---- Format number to display currency ----//
export const formatCurrency = (data, type = "en-US") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};

// ---- Format date to display with format ----//
export const formatDate = (date, format = DATE__FORMAT) => {
  if (!!!date) return "";
  return moment(date).format(format);
};

export const formatNumber = (data) =>{
  if(!data) return 0;
  return Math.round(data);
}

export const tranformNumberToPercent = (number) =>{
  if(!number) return 0
  return number * 100
}