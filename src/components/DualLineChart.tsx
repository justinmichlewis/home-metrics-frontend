import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import type { TemperatureScaleType } from "../api/models";
import { TemperatureScale } from "../api/models";
import { getMixMaxTempRange } from "../utils/chart";
import { Spin } from "antd";

interface ChartProps<T> {
  data: T[];
  unit: TemperatureScaleType;
  yAxisDataKeyOne: string;
  yAxisDataKeyTwo: string;
  xAxisDataKey: string;
  isLoading: boolean;
}

function DualLineChart<T>({
  data,
  unit,
  yAxisDataKeyOne,
  yAxisDataKeyTwo,
  xAxisDataKey,
  isLoading,
}: ChartProps<T>) {
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartHeight, setChartHeight] = useState<number>(650);

  useEffect(() => {
    if (unit === TemperatureScale.Fahrenheit) {
      setChartData(celciusToFahrenheit(data));
    } else {
      setChartData(data);
    }
  }, [data, unit]);

  // TODO MOVE THIS INTO UTILS
  const FOOTER_HEIGHT = 300;

  const calculateTableHeight = () => {
    const padding = FOOTER_HEIGHT;
    const availableHeight = window.innerHeight - padding;
    setChartHeight(availableHeight);
  };

  useEffect(() => {
    calculateTableHeight();
    window.addEventListener("resize", calculateTableHeight);
    return () => window.removeEventListener("resize", calculateTableHeight);
  }, []);

  return (
    <>
      <ResponsiveContainer width="50%" height={chartHeight}>
        <Spin
          spinning={isLoading}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
          }}
        />
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 70,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xAxisDataKey}
            tickFormatter={(isoStr) =>
              new Date(isoStr).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }
            interval="preserveStartEnd"
            angle={-45}
            textAnchor="end"
          />
          <YAxis
            domain={[
              getMixMaxTempRange(chartData)[0],
              getMixMaxTempRange(chartData)[1],
            ]}
          />
          <Tooltip
            labelFormatter={(label: string | number) => {
              const date = new Date(label);
              return <strong>{date.toLocaleString()}</strong>;
            }}
            formatter={(value: number, name: string) => {
              return [`${value.toFixed(2)}`, name];
            }}
          />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey={yAxisDataKeyOne}
            stroke="#8884d8"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey={yAxisDataKeyTwo}
            stroke="red"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

//TODO Use util function to convert Celsius to Fahrenheit
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
