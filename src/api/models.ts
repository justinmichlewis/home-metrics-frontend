import { timeZonesNames } from "@vvo/tzdb";

export const TemperatureScale = {
  Fahrenheit: "F",
  Celsius: "C",
} as const;

export type TemperatureScaleType =
  (typeof TemperatureScale)[keyof typeof TemperatureScale];

export const DateStartEnd = {
  Start: "start",
  End: "end",
} as const;

export type DateStartEndType = (typeof DateStartEnd)[keyof typeof DateStartEnd];

export type TimeZone = (typeof timeZonesNames)[number];
