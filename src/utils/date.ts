import { DateTime } from "luxon";
import type { DateStartEndType, TimeZone } from "../api/models";
import { DateStartEnd } from "../api/models";

export function getEndOfDayTime(isoDate: string): string {
  const date = new Date(isoDate);
  date.setUTCHours(date.getUTCHours() + 24);
  return date.toISOString();
}

export function getStartOrEndOfDayInTimezone(
  utcDateStr: string,
  startOrEnd: DateStartEndType,
  timeZone?: TimeZone
): string {
  // Default to America/Los_Angeles if no timeZone is provided
  if (!timeZone) {
    timeZone = "America/Los_Angeles";
  }
  const local = DateTime.fromISO(utcDateStr, { zone: "utc" }).setZone(timeZone);

  const startOfDay = local.startOf("day").toUTC().toISO() ?? "";
  const endOfDay = local.endOf("day").toUTC().toISO() ?? "";

  if (startOrEnd === DateStartEnd.Start) return startOfDay;
  else return endOfDay;
}
