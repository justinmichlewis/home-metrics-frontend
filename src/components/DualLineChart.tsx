import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";

interface ChartProps {
  data: any[];
  unit: string;
  yAxisDataKeyOne: string;
  yAxisDataKeyTwo: string;
  xAxisDataKey: string;
}

function DualLineChart({
  data,
  unit,
  yAxisDataKeyOne,
  yAxisDataKeyTwo,
  xAxisDataKey,
}: ChartProps) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (unit === "F") {
      setChartData(celciusToFahrenheit(data));
    } else {
      setChartData(data);
    }
  }, [data, unit]);

  return (
    <LineChart
      width={800}
      height={650}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey={xAxisDataKey}
        tickFormatter={(isoStr) => new Date(isoStr).toUTCString()}
        interval={2}
        angle={-45}
        textAnchor="end"
      />
      <YAxis
        domain={[
          getMixMaxTempRange(chartData)[0],
          getMixMaxTempRange(chartData)[1],
        ]}
      />
      <Legend />
      <Line
        type="monotone"
        dataKey={yAxisDataKeyOne}
        stroke="#8884d8"
        dot={false}
        activeDot={false}
      />
      <Line
        type="monotone"
        dataKey={yAxisDataKeyTwo}
        stroke="red"
        dot={false}
        activeDot={false}
      />
    </LineChart>
  );
}

const getMixMaxTempRange = (data: any[]) => {
  if (!data || data.length === 0) return [40, 100];
  const temperatures = data.map((d) => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures) * 10) / 10 - 10;
  const maxTemp = Math.ceil(Math.max(...temperatures) * 10) / 10 + 30;

  console.log("Min Temp:", minTemp, "Max Temp:", maxTemp);
  return [minTemp, maxTemp];
};

const celciusToFahrenheit = (data: any) => {
  const toFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

  return data.map((item: any) => ({
    ...item,
    temperature:
      typeof item.temperature === "number"
        ? toFahrenheit(item.temperature)
        : item.temperature,
    historicalTemperature:
      typeof item.historicalTemperature === "number"
        ? toFahrenheit(item.historicalTemperature)
        : item.historicalTemperature,
  }));
};

export default DualLineChart;
