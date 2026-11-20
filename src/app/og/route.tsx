import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

/** The site's serif, as TTF because Satori reads no woff2. Read once, at module scope. */
const basteleur = await readFile(join(process.cwd(), "assets/fonts/Basteleur-Moonlight.ttf"));

/** Dark-mode site colours as hex, since Satori takes no oklch. */
const BG = "#141418";
const FG = "#f9f9fb";
const FG_60 = "rgba(249,249,251,0.60)";
const FG_12 = "rgba(249,249,251,0.12)";

const MONO = "ui-monospace, Menlo, monospace";

/**
 * The link-preview card, drawn to match PostCover: the tag and site in mono across the top, the
 * title in basteleur, the date and reading time across the bottom, one hairline circle in the corner.
 * Accepts title, tag, date, min and section; every one is optional.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "writing";
  const tag = searchParams.get("tag") ?? "";
  const date = searchParams.get("date") ?? "";
  const min = searchParams.get("min") ?? "";
  const section = searchParams.get("section") ?? "writing";

  const titleSize = title.length > 60 ? 60 : title.length > 36 ? 72 : 86;
  const row = {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: MONO,
    fontSize: 24,
    color: FG_60,
    textTransform: "lowercase" as const,
  };

  return new ImageResponse(
    <div
      style={{
        background: BG,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        position: "relative",
        border: `2px solid ${FG_12}`,
      }}
    >
      <div style={row}>
        <span>{tag || section}</span>
        <span>abhk · {section}</span>
      </div>
      <div
        style={{
          display: "flex",
          fontFamily: "Basteleur",
          fontSize: titleSize,
          lineHeight: 1.08,
          color: FG,
          maxWidth: 960,
        }}
      >
        {title.toLowerCase()}
      </div>
      <div style={row}>
        <span>{date}</span>
        <span>{min ? `${min} min` : "abhisheksan.com"}</span>
      </div>
      <div
        style={{
          position: "absolute",
          right: -70,
          bottom: -110,
          width: 400,
          height: 400,
          borderRadius: 400,
          border: `2px solid ${FG_12}`,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Basteleur", data: basteleur, style: "normal", weight: 400 }],
    },
  );
}
