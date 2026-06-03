import { ImageResponse } from "next/og"
import type { NextRequest } from "next/server"

export const runtime = "edge"

// Dark mode site colors (oklch → hex approximations)
const BG = "#1c1c22"         // oklch(0.141 0.005 285.823)
const FG = "#f9f9fb"         // oklch(0.985 0 0)
const FG_50 = "rgba(249,249,251,0.50)"
const FG_35 = "rgba(249,249,251,0.35)"
const FG_20 = "rgba(249,249,251,0.20)"
const FG_10 = "rgba(249,249,251,0.10)"
const FG_06 = "rgba(249,249,251,0.06)"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title    = searchParams.get("title")    ?? "writing"
  const tag      = searchParams.get("tag")      ?? ""
  const subhead  = searchParams.get("subhead")  ?? ""
  const date     = searchParams.get("date")     ?? ""
  const min      = searchParams.get("min")      ?? ""

  // Scale title font size to available width
  const titleSize = title.length > 55 ? 38 : title.length > 38 ? 46 : 54

  const eyebrow = [tag, date, min ? `${min} min` : ""]
    .filter(Boolean)
    .join("  ·  ")

  return new ImageResponse(
    (
      <div
        style={{
          background: BG,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "0",
          fontFamily: "Georgia, serif",
          position: "relative",
        }}
      >
        {/* Subtle top nav bar — site chrome */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 64px",
            borderBottom: `1px solid ${FG_10}`,
          }}
        >
          <span
            style={{
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: FG,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            ABHK
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 32,
            }}
          >
            {["home", "writing", "projects"].map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 12,
                  color: item === "writing" ? FG : FG_35,
                  fontFamily: "system-ui, sans-serif",
                  fontWeight: item === "writing" ? 500 : 300,
                  letterSpacing: "0.02em",
                  borderBottom: item === "writing" ? `1px solid ${FG_35}` : "none",
                  paddingBottom: 2,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Article header content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "48px 64px 44px",
          }}
        >
          {/* Eyebrow: tag · date · X min */}
          {eyebrow && (
            <p
              style={{
                fontSize: 11,
                color: FG_35,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                marginBottom: 20,
                margin: "0 0 20px 0",
              }}
            >
              {eyebrow}
            </p>
          )}

          {/* Title — serif italic, matches h1 on the page */}
          <h1
            style={{
              fontSize: titleSize,
              color: FG,
              fontStyle: "italic",
              lineHeight: 1.25,
              fontWeight: 400,
              margin: "0 0 20px 0",
              maxWidth: 960,
            }}
          >
            {title}
          </h1>

          {/* Subhead */}
          {subhead && (
            <p
              style={{
                fontSize: 17,
                color: FG_50,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                lineHeight: 1.6,
                margin: "0 0 32px 0",
                maxWidth: 880,
              }}
            >
              {subhead.length > 120 ? subhead.slice(0, 117) + "..." : subhead}
            </p>
          )}

          {/* Horizontal rule */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: FG_10,
              margin: "auto 0 0 0",
            }}
          />
        </div>

        {/* Footer bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 64px",
            borderTop: `1px solid ${FG_06}`,
          }}
        >
          <span
            style={{
              fontSize: 13,
              color: FG_20,
              fontFamily: "system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: "0.06em",
            }}
          >
            abhisheksan.com/writing
          </span>
          {tag && (
            <span
              style={{
                fontSize: 11,
                color: FG_20,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 300,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                border: `1px solid ${FG_10}`,
                padding: "3px 10px",
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
