import { useEffect, useState } from "react";
import type { WeatherCondition } from "./models";

type FetchState<T> = {
  data: T[];
  isLoading: boolean;
  error: string | null;
};

const baseUrl = "http://10.0.0.168:5000/api";

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState({ data: [], isLoading: true, error: null });

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setState({ data: json, isLoading: false, error: null });
        }
      })
      .catch((err) => {
        if (isMounted) {
          setState({ data: [], isLoading: false, error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  return state;
}

export function useGetAllConditions(
  startDate: string,
  endDate: string
): FetchState<WeatherCondition> {
  const params = new URLSearchParams({
    startDate,
    endDate,
  });

  const { data, error, isLoading } = useFetch<WeatherCondition>(
    `${baseUrl}/all_readings?${params.toString()}`
  );

  return {
    data,
    error,
    isLoading,
  };
}
