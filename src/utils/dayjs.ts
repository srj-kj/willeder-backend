/* eslint-disable max-len */
import dayjs from "dayjs";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
import * as localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(utc.default);
dayjs.extend(timezone.default);
dayjs.extend(localizedFormat.default);

export const getCurrentJST = () => {
  return dayjs.tz(dayjs(), "Asia/Tokyo").format("YYYY-MM-DD HH:mm:ss");
};

export const getAddToCurrentJST = (num: number, unit: dayjs.ManipulateType) => {
  return dayjs.tz(dayjs(), "Asia/Tokyo").add(num, unit).format("YYYY-MM-DD HH:mm:ss");
};

export const isAfterCurrentJST = (time: string) => {
  const currentTimeJST = dayjs.tz(dayjs(), "Asia/Tokyo");
  const inputTime = dayjs.tz(dayjs(time), "Asia/Tokyo");
  return inputTime.isAfter(currentTimeJST);
};

