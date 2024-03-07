import type { CssThemeVariable } from "@/app/theme";

export const SVG_ICON_CONSTANTS = {
  SIZE: 24,
  // TODO: themeの方とtailwind.config.tsとかぶってるのでどうにかする
  CSS_VARS: {
    colorAppMainTop: "hsl(var(--colorAppMainTop))",
    colorAppMainMidTop: "hsl(var(--colorAppMainMidTop))",
    colorAppMainMidBottom: "hsl(var(--colorAppMainMidBottom))",
    colorAppMainBottom: "hsl(var(--colorAppMainBottom))",
  } satisfies { [key in CssThemeVariable]: string },
} as const;
