import React from "react";
import "./button.css";

type ButtonProperties = {
  /**
   * Is this the principal call to action on the page?
   */
  readonly primary?: boolean;
  /**
   * What background color to use
   */
  readonly backgroundColor?: string;
  /**
   * How large should the button be?
   */
  readonly size?: "large" | "medium" | "small";
  /**
   * Button contents
   */
  readonly label: string;
  /**
   * Optional click handler
   */
  readonly onClick?: () => void;
};

/**
 * Primary UI component for user interaction
 */
export function Button({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  ...properties
}: ButtonProperties): JSX.Element {
  const mode = primary
    ? "storybook-button--primary"
    : "storybook-button--secondary";
  return (
    <button
      className={["storybook-button", `storybook-button--${size}`, mode].join(
        " "
      )}
      type="button"
      {...properties}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
  );
}
