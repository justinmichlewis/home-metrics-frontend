export const getMixMaxTempRange = (data: any[]) => {
  if (!data || data.length === 0) return [40, 100];
  const temperatures = data.map((d) => d.temperature);
  const historicalTemperatures = data.map((d) => d.historicalTemperature);
  let minTemp = Math.floor(Math.min(...temperatures) * 10) / 10;
  let maxTemp = Math.ceil(Math.max(...temperatures) * 10) / 10;
  const historicalMinTemp =
    Math.floor(Math.min(...historicalTemperatures) * 10) / 10 - 1;
  const historicalMaxTemp =
    Math.ceil(Math.max(...historicalTemperatures) * 10) / 10 + 1;

  if (historicalMinTemp < minTemp) minTemp = historicalMinTemp;
  if (historicalMaxTemp > maxTemp) maxTemp = historicalMaxTemp;

  console.log("Min Temp:", minTemp, "Max Temp:", maxTemp);
  return [minTemp, maxTemp];
};
