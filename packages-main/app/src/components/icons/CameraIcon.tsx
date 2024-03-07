import { SVG_ICON_CONSTANTS } from "./iconUtil";

export function CameraIcon(): JSX.Element {
  return (
    <svg
      width={SVG_ICON_CONSTANTS.SIZE}
      height={SVG_ICON_CONSTANTS.SIZE}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 12L18 6H30L33 12H15Z"
        fill={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainMidBottom}
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinejoin="bevel"
      />
      <rect
        x="4"
        y="12"
        width="40"
        height="30"
        rx="3"
        fill={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainMidBottom}
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinejoin="bevel"
      />
      <path
        d="M24 35C28.4183 35 32 31.4183 32 27C32 22.5817 28.4183 19 24 19C19.5817 19 16 22.5817 16 27C16 31.4183 19.5817 35 24 35Z"
        fill={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainMidTop}
        stroke={SVG_ICON_CONSTANTS.CSS_VARS.colorAppMainTop}
        strokeWidth="4"
        strokeLinejoin="bevel"
      />
    </svg>
  );
}
