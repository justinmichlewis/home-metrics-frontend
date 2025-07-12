import { Result } from "antd";

export function ApiError({ error }: { error: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Result status="warning" title={error} />
    </div>
  );
}
