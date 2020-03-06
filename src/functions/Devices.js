import axios from "axios";

import { URL, httpConfig } from "./config.js";

export const getDevices = async () => {
  const res = await axios.get(`${URL}/user/allDevices`, httpConfig);
  const { devices } = res.data;
  return devices;
};

export const setDeviceInfo = async id => {
  const res1 = await axios.get(
    `${URL}/deviceControl/device/${id}/state`,
    httpConfig
  );

  const { deviceState } = res1.data;

  let state = {};

  if (
    deviceState !== undefined &&
    deviceState.hum > 0 &&
    deviceState.temp > 0
  ) {
    state = {
      hum: deviceState.hum,
      temp: deviceState.temp,
      datetime: deviceState.datetime
    };
  } else state = null;

  const res2 = await axios.get(
    `${URL}/deviceControl/device/${id}/config`,
    httpConfig
  );

  const { deviceConfig } = res2.data;

  let config = {};

  if (deviceConfig !== undefined && !deviceConfig.err && deviceConfig.board) {
    config = {
      duty: deviceConfig.board.led1.duty,
      datetime: deviceConfig.datetime
    };
  } else config = null;

  return {
    state,
    config
  };
};

export const setLastSeen = (timestampConfig, timestampState) => {
  const configDate = new Date(timestampConfig);
  const stateDate = new Date(timestampState);

  if (configDate > stateDate) {
    return `${new Date(timestampConfig).toLocaleDateString("es-CL")} ${new Date(
      timestampConfig
    ).toLocaleTimeString("es-CL")}`;
  } else {
    return `${new Date(timestampState).toLocaleDateString("es-CL")} ${new Date(
      timestampState
    ).toLocaleTimeString("es-CL")}`;
  }
};

export const setDeviceStatusColour = state => {
  if (state.timestamp === null) return "bg-danger";

  if (new Date(state.timestamp) > new Date(new Date() - 60000))
    return "bg-success";
  else return "bg-warning";
};
