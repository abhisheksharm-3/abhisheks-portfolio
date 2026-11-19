import type { ThemeRegistrationRaw } from "shiki";

type Palette = {
  text: string;
  quiet: string;
  keyword: string;
  literal: string;
};

/**
 * Syntax colours for post code blocks. The site has no accent colour, so code gets
 * two tints on the neutral ramp (violet for keywords, slate for literals) and
 * everything else stays at text weight, with comments and punctuation stepped down.
 * Every colour clears 4.5:1 on the block background in its own theme.
 */
function buildTheme(name: string, type: "light" | "dark", colors: Palette): ThemeRegistrationRaw {
  return {
    name,
    type,
    colors: { "editor.foreground": colors.text, "editor.background": "#00000000" },
    settings: [
      { settings: { foreground: colors.text } },
      {
        scope: ["comment", "punctuation.definition.comment"],
        settings: { foreground: colors.quiet, fontStyle: "italic" },
      },
      {
        scope: ["punctuation", "meta.brace", "keyword.operator", "meta.delimiter"],
        settings: { foreground: colors.quiet },
      },
      {
        scope: [
          "keyword",
          "storage",
          "keyword.operator.new",
          "keyword.operator.expression",
          "keyword.operator.word",
          "keyword.operator.logical.python",
          "constant.language",
        ],
        settings: { foreground: colors.keyword },
      },
      {
        scope: [
          "string",
          "punctuation.definition.string",
          "constant.numeric",
          "constant.character",
          "markup.inserted",
        ],
        settings: { foreground: colors.literal },
      },
    ],
  };
}

export const CODE_THEMES = {
  light: buildTheme("portfolio-light", "light", {
    text: "#26262f",
    quiet: "#666677",
    keyword: "#58499a",
    literal: "#2c5c7c",
  }),
  dark: buildTheme("portfolio-dark", "dark", {
    text: "#dcdce6",
    quiet: "#9a9aab",
    keyword: "#b8aeea",
    literal: "#8fb6d4",
  }),
};
