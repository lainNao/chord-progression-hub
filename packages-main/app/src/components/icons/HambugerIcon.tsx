import { SVG_ICON_CONSTANTS } from "./iconUtil";

export function HamburgerIcon(): JSX.Element {
  return (
    <svg
      width={SVG_ICON_CONSTANTS.SIZE}
      height={SVG_ICON_CONSTANTS.SIZE}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.94971 11.9497H39.9497"
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
      <path
        d="M7.94971 23.9497H39.9497"
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
      <path
        d="M7.94971 35.9497H39.9497"
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
