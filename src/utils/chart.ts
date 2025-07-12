export const getMixMaxTempRange = (data: any[]) => {
  if (!data || data.length === 0) return [40, 100];
  const temperatures = data.map((d) => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures) * 10) / 10;
  const maxTemp = Math.ceil(Math.max(...temperatures) * 10) / 10;

  console.log("Min Temp:", minTemp, "Max Temp:", maxTemp);
  return [minTemp, maxTemp];
};
