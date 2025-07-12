export const TemperatureScale = {
  Fahrenheit: "F",
  Celsius: "C",
} as const;

export type TemperatureScaleType =
  (typeof TemperatureScale)[keyof typeof TemperatureScale];
