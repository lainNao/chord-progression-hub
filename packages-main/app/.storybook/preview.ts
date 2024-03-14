import type { Preview } from "@storybook/react";
import { ThemeSelectorDecorator } from "./decorators/ThemeSelectorDecorator";
import { defaultThemes } from "../src/theme";

import "../src/app/globals.css";

const themeIds = defaultThemes.map((theme) => theme.id);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    ThemeSelectorDecorator({
      themeIds,
      defaultThemeId: themeIds[0],
    }),
  ],
};

export default preview;
