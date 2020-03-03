import axios from "axios";

import { URL, httpConfig } from "./config.js";

export const getDayGraph = async id => {
  const res = await axios.get(`${URL}/history/day/${id}`, httpConfig);
  const { historyDay } = res.data;
  return historyDay;
};

export const getWeekGraph = async id => {
  const res = await axios.get(`${URL}/history/week/${id}`, httpConfig);
  const { historyWeek } = res.data;
  return historyWeek;
};

export const getMonthGraph = async id => {
  const res = await axios.get(`${URL}/history/month/${id}`, httpConfig);
  const { historyMonth } = res.data;
  return historyMonth;
};

export const getUserInfo = async id => {
  const res = await axios.get(`${URL}/user/device/${id}/user`, httpConfig);
  const { user } = res.data;
  return user;
};
