import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useEffect, useState } from "react";

interface ChartProps {
  data: any[];
  unit: string;
}

function Chart({ data, unit }: ChartProps) {
  const reversedData = data ? [...data].reverse() : [];
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    if (reversedData && reversedData.length > 0) {
      setChartData(reversedData);
    } else {
      setChartData([]);
    }

    if (unit === "F") {
      setChartData(celciusToFahrenheit(reversedData));
    } else {
      setChartData(reversedData);
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
        dataKey={"reading_created_at"}
        tickFormatter={(isoStr) =>
          new Date(isoStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        }
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
        dataKey="temperature"
        stroke="#8884d8"
        dot={false}
        activeDot={false}
      />
    </LineChart>
  );
}

const getMixMaxTempRange = (data: any[]) => {
  if (!data || data.length === 0) return [40, 100];
  const temperatures = data.map((d) => d.temperature);
  const minTemp = Math.floor(Math.min(...temperatures) * 10) / 10;
  const maxTemp = Math.ceil(Math.max(...temperatures) * 10) / 10;
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
  }));
};

export default Chart;
