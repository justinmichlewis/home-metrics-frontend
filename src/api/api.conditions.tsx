import { useEffect, useState } from "react";

type FetchState<T> = {
  data: T | [];
  isLoading: boolean;
  error: string | null;
};

export function useFetch<T = any>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    setState((prev) => ({ ...prev, isLoading: true }));

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

export function useGetConditions() {
  const { data, error, isLoading } = useFetch(
    "http://127.0.0.1:5000/api/bme680_readings"
  );

  return {
    data,
    error,
    isLoading,
  };
}
