import { DecoratorHelpers } from "@storybook/addon-themes";
import { changeTheme } from "../../src/theme";
import { PartialStoryFn } from "@storybook/csf";
import { ReactRenderer, StoryContext } from "@storybook/react";

const { initializeThemeState, pluckThemeFromContext, useThemeParameters } =
  DecoratorHelpers;

export const ThemeSelectorDecorator = ({
  themeIds,
  defaultThemeId,
}: {
  readonly themeIds: string[];
  readonly defaultThemeId: string;
}) => {
  initializeThemeState(themeIds, defaultThemeId);

  return (story: PartialStoryFn<ReactRenderer>, context) => {
    const themeFromContext = pluckThemeFromContext(context);
    const { themeOverride } = useThemeParameters();
    const selectedThemeId = themeOverride || themeFromContext || defaultThemeId;
    if (selectedThemeId) {
      changeTheme(selectedThemeId);
    }

    return story();
  };
};
