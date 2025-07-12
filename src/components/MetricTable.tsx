import { Table } from "antd";
import type { WeatherCondition } from "../api/models";
import { celciusToFahrenheit } from "../utils/conversions";

interface MetricTableProps {
  data: WeatherCondition[];
  unit: string;
  isLoading: boolean;
}

function MetricTable({ data, unit, isLoading }: MetricTableProps) {
  return (
    <Table
      dataSource={data}
      columns={columns(unit)}
      style={{ width: "50%" }}
      loading={isLoading}
      rowKey={(record) => record.id}
    />
  );
}

const columns = (unit: string) => {
  return [
    {
      title: "Date",
      dataIndex: "readingCreatedAtNearestHour",
      key: "readingCreatedAtNearestHour",
      width: 250,
      render: (date: string) => new Date(date).toLocaleString("en-US"),
    },
    {
      title: (
        <>
          Temperature{String.fromCharCode(176)}
          {unit}
        </>
      ),
      dataIndex: "temperature",
      key: "temperature",
      width: 250,
      render: (temp: number) =>
        unit === "F"
          ? `${celciusToFahrenheit(temp).toFixed(2)} °F`
          : `${temp.toFixed(2)} °C`,
    },
    {
      title: (
        <>
          Historical Temperature{String.fromCharCode(176)}
          {unit}
        </>
      ),
      dataIndex: "historicalTemperature",
      key: "historicalTemperature",
      width: 250,
      render: (temp: number) =>
        unit === "F"
          ? `${celciusToFahrenheit(temp).toFixed(2)} °F`
          : `${temp.toFixed(2)} °C`,
    },
    {
      title: "Humidity",
      dataIndex: "humidity",
      key: "humidity",
      render: (humidity: number) => `${humidity.toFixed(2)} %`,
    },
  ];
};

export default MetricTable;
