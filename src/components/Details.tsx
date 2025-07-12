import { Flex, Switch, DatePicker } from "antd";
import MetricTable from "./MetricTable";
import DualLineChart from "./DualLineChart";
import { useGetAllConditions } from "../api/api.conditions";
import type { TemperatureScaleType } from "../api/models";
import { TemperatureScale } from "../api/models";
import { useMemo, useState } from "react";
import type { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getEndOfDayTime, getStartOrEndOfDayInTimezone } from "../utils/date";
import { DateStartEnd } from "../api/models";
import { ApiError } from "./Error";

const { RangePicker } = DatePicker;
dayjs.extend(utc);

interface DateRange {
  startDate: string;
  endDate: string;
}

function Details() {
  const [unit, setUnit] = useState<TemperatureScaleType>(
    TemperatureScale.Fahrenheit
  );
  const [dateStrings, setDateStrings] = useState<DateRange>({
    startDate: getStartOrEndOfDayInTimezone(
      new Date().toISOString(),
      DateStartEnd.Start
    ),
    endDate: getStartOrEndOfDayInTimezone(
      new Date().toISOString(),
      DateStartEnd.End
    ),
  });

  const { data, error, isLoading } = useGetAllConditions(
    dateStrings.startDate,
    dateStrings.endDate
  );

  const onUnitChange = () => {
    setUnit((prevUnit: TemperatureScaleType) =>
      prevUnit === TemperatureScale.Fahrenheit
        ? TemperatureScale.Celsius
        : TemperatureScale.Fahrenheit
    );
  };

  const onDateChange: RangePickerProps["onChange"] = (dates) => {
    if (dates) {
      const [start, end] = dates;

      // Antd DatePicker will return dates in local timezone, so we need to convert them to UTC
      // and set the end date to the end of the day localized to the timezone
      setDateStrings({
        startDate: start?.toISOString() || "",
        endDate: getStartOrEndOfDayInTimezone(
          end?.toISOString() || "",
          DateStartEnd.End
        ),
      });
    }
  };

  return (
    <div>
      <Flex gap="middle" align="start" justify="space-between">
        <div>
          <h1>Welcome to the working title </h1>
          <p>Historical in home temperatures.</p>
        </div>
        <RangePicker
          onChange={onDateChange}
          defaultValue={[
            dayjs(new Date().toISOString(), "YYYY-MM-DD"),
            dayjs(getEndOfDayTime(new Date().toISOString()), "YYYY-MM-DD"),
          ]}
        />
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
        {error ? (
          <ApiError error={error} />
        ) : (
          <>
            <MetricTable data={data} unit={unit} isLoading={isLoading} />
            <DualLineChart
              data={[...data].reverse()}
              unit={unit}
              yAxisDataKeyOne="temperature"
              yAxisDataKeyTwo="historicalTemperature"
              xAxisDataKey="readingCreatedAtNearestHour"
              isLoading={isLoading}
            />
          </>
        )}
      </Flex>
    </div>
  );
}
export default Details;
