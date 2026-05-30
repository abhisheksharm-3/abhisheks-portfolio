import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? "writing"
  const tag = searchParams.get("tag") ?? ""

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {tag && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                border: "1px solid rgba(255,255,255,0.1)",
                padding: "4px 12px",
                borderRadius: 3,
              }}
            >
              {tag}
            </div>
          </div>
        )}

        <div
          style={{
            fontSize: title.length > 40 ? 42 : 52,
            color: "rgba(255,255,255,0.9)",
            fontStyle: "italic",
            lineHeight: 1.25,
            maxWidth: 880,
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.2)",
            fontFamily: "system-ui, sans-serif",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          abhisheksan.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
