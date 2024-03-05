import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import "./preview.css";
import { ThemeSelectorDecorator } from "./decorators/ThemeSelectorDecorator";
import { defaultThemes } from "../src/app/theme";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    ThemeSelectorDecorator({
      themeIds: defaultThemes.map((theme) => theme.id),
      defaultThemeId: "appLight",
    }),
  ],
};

export default preview;
