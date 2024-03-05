type CssThemeVariable = "colorAppMainTop" | "colorAppMainBottom";

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
      colorAppMainBottom: "300deg 100% 95%",
    },
  },
  {
    id: "appDark",
    label: "App Dark",
    values: {
      colorAppMainTop: "300deg 100% 90%",
      colorAppMainBottom: "300deg 100% 10%",
    },
  },
];

/** TODO: デフォルトテーマしか対応してないのでデータと切り替えの処理を分離するなどする */
export function changeTheme(themeName: string): void {
  const targetTheme = defaultThemes.find((theme) => theme.id === themeName);
  if (!targetTheme) {
    return;
  }
  for (const [key, value] of Object.entries(targetTheme.values)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}
