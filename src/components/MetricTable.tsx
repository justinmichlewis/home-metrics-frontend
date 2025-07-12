import { Table } from "antd";
import type { WeatherCondition } from "../api/models";
import { celciusToFahrenheit } from "../utils/conversions";
import { useEffect, useState } from "react";

interface MetricTableProps {
  data: WeatherCondition[];
  unit: string;
  isLoading: boolean;
}

const FOOTER_HEIGHT = 400;

function MetricTable({ data, unit, isLoading }: MetricTableProps) {
  const [scrollY, setScrollY] = useState<number>(0);

  const calculateTableHeight = () => {
    const padding = FOOTER_HEIGHT;
    const availableHeight = window.innerHeight - padding;
    setScrollY(availableHeight);
  };

  useEffect(() => {
    calculateTableHeight();
    window.addEventListener("resize", calculateTableHeight);
    return () => window.removeEventListener("resize", calculateTableHeight);
  }, []);

  return (
    <Table
      dataSource={data}
      columns={columns(unit)}
      scroll={{ y: scrollY }}
      loading={isLoading}
      rowKey={(record) => record.id}
      style={{ width: "50%" }}
    />
  );
}

const columns = (unit: string) => {
  return [
    {
      title: "Date",
      dataIndex: "readingCreatedAtNearestHour",
      key: "readingCreatedAtNearestHour",
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
