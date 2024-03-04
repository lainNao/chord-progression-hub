import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";

import { Page } from "./Page";

const meta = {
  component: Page,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on interaction testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    console.log(canvas);
    /*
     * const loginButton = canvas.getByRole("button", { name: /log in/i });
     * await expect(loginButton).toBeInTheDocument();
     * await userEvent.click(loginButton);
     * await expect(loginButton).not.toBeInTheDocument();
     */

    /*
     * const logoutButton = canvas.getByRole("button", { name: /log out/i });
     * await expect(logoutButton).toBeInTheDocument();
     */
  },
};
