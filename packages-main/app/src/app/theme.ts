import type { Result } from "ts-simple-result";

export type CssThemeVariable =
  | "colorAppMainTop"
  | "colorAppMainMidTop"
  | "colorAppMainMidBottom"
  | "colorAppMainBottom";

export type Theme = {
  id: string;
  label: string;
  values: {
    [key in CssThemeVariable]: string;
  };
};

export const defaultThemes: Theme[] = [
  {
    id: "appLight",
    label: "App Light",
    values: {
      colorAppMainTop: "300deg 100% 5%",
      colorAppMainMidTop: "300deg 100% 30%",
      colorAppMainMidBottom: "300deg 100% 70%",
      colorAppMainBottom: "300deg 100% 95%",
    },
  },
  {
    id: "appDark",
    label: "App Dark",
    values: {
      colorAppMainTop: "300deg 100% 90%",
      colorAppMainMidTop: "300deg 100% 70%",
      colorAppMainMidBottom: "300deg 100% 30%",
      colorAppMainBottom: "300deg 100% 10%",
    },
  },
  // TODO: ここらへんDBからもらうはずなので
  {
    id: "darkBlue",
    label: "Dark Blue",
    values: {
      colorAppMainTop: "200deg 100% 90%",
      colorAppMainMidTop: "200deg 100% 70%",
      colorAppMainMidBottom: "200deg 100% 20%",
      colorAppMainBottom: "200deg 100% 10%",
    },
  },
  {
    id: "darkGreen",
    label: "Dark Green",
    values: {
      colorAppMainTop: "100deg 100% 90%",
      colorAppMainMidTop: "100deg 100% 70%",
      colorAppMainMidBottom: "100deg 100% 20%",
      colorAppMainBottom: "100deg 100% 10%",
    },
  },
];

function setCssVariables(vars: Record<string, string>) {
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export function changeTheme(themeName: string): Result<undefined> {
  const targetTheme = defaultThemes.find((theme) => theme.id === themeName);
  if (!targetTheme) {
    return {
      isSuccess: false,
      error: new Error("指定されたテーマが見つかりません"),
    };
  }
  setCssVariables(targetTheme.values);
  return { isSuccess: true, value: undefined };
}
