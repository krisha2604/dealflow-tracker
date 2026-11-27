import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1f6b4a",
          borderRadius: 8,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 2,
          padding: 6,
        }}
      >
        <div style={{ width: 5, height: 8, background: "#d7efe4", borderRadius: 1 }} />
        <div style={{ width: 5, height: 12, background: "#eef8f3", borderRadius: 1 }} />
        <div style={{ width: 5, height: 18, background: "#ffffff", borderRadius: 1 }} />
      </div>
    ),
    { ...size },
  );
}
