import { Flex, Switch, DatePicker } from "antd";
import MetricTable from "./MetricTable";
import Chart from "./Chart";
import { useGetConditions } from "../api/api.conditions";
import { useState } from "react";

const { RangePicker } = DatePicker;

function Details() {
  const { data, error, isLoading } = useGetConditions();
  const [unit, setUnit] = useState("F");

  const onUnitChange = () => {
    setUnit((prevUnit: string) => (prevUnit === "F" ? "C" : "F"));
  };
  return (
    <div>
      <Flex gap="middle" align="start" justify="space-between">
        <div>
          <h1>Welcome to the working title </h1>
          <p>Historical in home temperatures.</p>
        </div>
        <RangePicker />
        <Switch
          style={{
            transform: "scale(1.2)",
            transformOrigin: "left",
            marginRight: "50px",
          }}
          defaultChecked
          checkedChildren="Fahrenheit"
          unCheckedChildren="Celsius"
          onChange={onUnitChange}
        />
      </Flex>
      <Flex gap="middle" align="start" justify="space-between">
        <MetricTable data={data} unit={unit} />
        <Chart data={data} unit={unit} />
      </Flex>
    </div>
  );
}
export default Details;
