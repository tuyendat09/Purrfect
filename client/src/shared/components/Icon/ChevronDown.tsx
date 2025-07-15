import { IconProps } from "@/shared/types/Icon";

export default function ChevronDown({ className }: IconProps) {
  return (
    <svg className={className} focusable="false" viewBox="0 0 11 6.5">
      <path
        d="M5.377,0,6.5,1.149,2.247,5.5,6.5,9.851,5.377,11,0,5.5Z"
        transform="translate(0 6.5) rotate(-90)"
        fill="currentColor"
      ></path>
    </svg>
  );
}
