import { Table } from "antd";

interface MetricTableProps {
  data: [];
  unit: string;
}

function MetricTable({ data, unit }: MetricTableProps) {
  const columns = [
    {
      title: "Date",
      dataIndex: "reading_created_at",
      key: "reading_created_at",
      width: 250,
      render: (text: string) => new Date(text).toLocaleString(),
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
      title: "Humidity",
      dataIndex: "humidity",
      key: "humidity",
      render: (humidity: number) => `${humidity.toFixed(2)} %`,
    },
  ];

  return <Table dataSource={data} columns={columns} style={{ width: "50%" }} />;
}

function celciusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export default MetricTable;
