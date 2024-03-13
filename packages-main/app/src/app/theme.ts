import type { Result } from "ts-simple-result";

export type CssThemeProperties =
  | "--background"
  | "--foreground"
  | "--card"
  | "--card-foreground"
  | "--popover"
  | "--popover-foreground"
  | "--primary"
  | "--primary-foreground"
  | "--secondary"
  | "--secondary-foreground"
  | "--muted"
  | "--muted-foreground"
  | "--accent"
  | "--accent-foreground"
  | "--destructive"
  | "--destructive-foreground"
  | "--border"
  | "--input"
  | "--ring"
  | "--radius";

export const cssThemeValues = {
  "--background": "hsl(var(--background))",
  "--foreground": "hsl(var(--foreground))",
  "--card": "hsl(var(--card))",
  "--card-foreground": "hsl(var(--card-foreground))",
  "--popover": "hsl(var(--popover))",
  "--popover-foreground": "hsl(var(--popover-foreground))",
  "--primary": "hsl(var(--primary))",
  "--primary-foreground": "hsl(var(--primary-foreground))",
  "--secondary": "hsl(var(--secondary))",
  "--secondary-foreground": "hsl(var(--secondary-foreground))",
  "--muted": "hsl(var(--muted))",
  "--muted-foreground": "hsl(var(--muted-foreground))",
  "--accent": "hsl(var(--accent))",
  "--accent-foreground": "hsl(var(--accent-foreground))",
  "--destructive": "hsl(var(--destructive))",
  "--destructive-foreground": "hsl(var(--destructive-foreground))",
  "--border": "hsl(var(--border))",
  "--input": "hsl(var(--input))",
  "--ring": "hsl(var(--ring))",
  "--radius": "var(--radius)",
} satisfies { [key in CssThemeProperties]: string };

export type Theme = {
  id: string;
  label: string;
  colorSchema: "light" | "dark";
  cssVariables: {
    [key in CssThemeProperties]: string;
  };
};

export const defaultThemes: Theme[] = [
  {
    id: "appLight",
    label: "App Light",
    colorSchema: "light",
    cssVariables: {
      "--background": "0 0% 100%",
      "--foreground": "240 10% 3.9%",
      "--card": "0 0% 100%",
      "--card-foreground": "240 10% 3.9%",
      "--popover": "0 0% 100%",
      "--popover-foreground": "240 10% 3.9%",
      "--primary": "240 5.9% 10%",
      "--primary-foreground": "0 0% 98%",
      "--secondary": "240 4.8% 95.9%",
      "--secondary-foreground": "240 5.9% 10%",
      "--muted": "240 4.8% 95.9%",
      "--muted-foreground": "240 3.8% 46.1%",
      "--accent": "240 4.8% 95.9%",
      "--accent-foreground": "240 5.9% 10%",
      "--destructive": "0 84.2% 60.2%",
      "--destructive-foreground": "0 0% 98%",
      "--border": "240 5.9% 90%",
      "--input": "240 5.9% 90%",
      "--ring": "240 5.9% 10%",
      "--radius": "1rem",
    },
  },
  {
    id: "appDark",
    label: "App Dark",
    colorSchema: "dark",
    cssVariables: {
      "--background": "20 14.3% 4.1%",
      "--foreground": "0 0% 95%",
      "--card": "24 9.8% 10%",
      "--card-foreground": "0 0% 95%",
      "--popover": "0 0% 9%",
      "--popover-foreground": "0 0% 95%",
      "--primary": "346.8 77.2% 49.8%",
      "--primary-foreground": "355.7 100% 97.3%",
      "--secondary": "240 3.7% 15.9%",
      "--secondary-foreground": "0 0% 98%",
      "--muted": "0 0% 15%",
      "--muted-foreground": "240 5% 64.9%",
      "--accent": "12 6.5% 15.1%",
      "--accent-foreground": "0 0% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "0 85.7% 97.3%",
      "--border": "240 3.7% 15.9%",
      "--input": "240 3.7% 15.9%",
      "--ring": "346.8 77.2% 49.8%",
      "--radius": "1rem",
    },
  },
  {
    id: "darkBlue",
    label: "Dark Blue",
    colorSchema: "dark",
    cssVariables: {
      "--background": "222.2 84% 4.9%",
      "--foreground": "210 40% 98%",
      "--card": "222.2 84% 4.9%",
      "--card-foreground": "210 40% 98%",
      "--popover": "222.2 84% 4.9%",
      "--popover-foreground": "210 40% 98%",
      "--primary": "217.2 91.2% 59.8%",
      "--primary-foreground": "222.2 47.4% 11.2%",
      "--secondary": "217.2 32.6% 17.5%",
      "--secondary-foreground": "210 40% 98%",
      "--muted": "217.2 32.6% 17.5%",
      "--muted-foreground": "215 20.2% 65.1%",
      "--accent": "217.2 32.6% 17.5%",
      "--accent-foreground": "210 40% 98%",
      "--destructive": "0 62.8% 30.6%",
      "--destructive-foreground": "210 40% 98%",
      "--border": "217.2 32.6% 17.5%",
      "--input": "217.2 32.6% 17.5%",
      "--ring": "224.3 76.3% 48%",
      "--radius": "1rem",
    },
  },
];

function setHtmlTagCssVariables(vars: Record<string, string>) {
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value);
  }
}

function setHtmlTagCssColorSchema(colorSchema: "light" | "dark") {
  document.documentElement.style.colorScheme = colorSchema;
}

/** CSS変数と、cssのcolor-schemeの値をセットする */
export function changeTheme(themeName: string): Result<undefined> {
  const targetTheme = defaultThemes.find((theme) => theme.id === themeName);
  if (!targetTheme) {
    return {
      isSuccess: false,
      error: new Error("指定されたテーマが見つかりません"),
    };
  }

  setHtmlTagCssVariables(targetTheme.cssVariables);
  setHtmlTagCssColorSchema(targetTheme.colorSchema);
  return { isSuccess: true, value: undefined };
}
