import { IconProps } from "@/shared/types/Icon";

export default function ThreeDots({ className }: IconProps) {
  return (
    <svg className={className} focusable="false" viewBox="0 0 15 3">
      <g transform="translate(-1364 -145)">
        <rect
          width="3"
          height="3"
          transform="translate(1364 145)"
          fill="currentColor"
        ></rect>
        <rect
          width="3"
          height="3"
          transform="translate(1370 145)"
          fill="currentColor"
        ></rect>
        <rect
          width="3"
          height="3"
          transform="translate(1376 145)"
          fill="currentColor"
        ></rect>
      </g>
    </svg>
  );
}
