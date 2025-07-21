import { IconProps } from "@/shared/types/Icon";

export default function NewImage({ className }: IconProps) {
  return (
    <svg className={className} focusable="false" viewBox="0 0 14 14">
      <path
        d="M44.833,32H33.167A1.167,1.167,0,0,0,32,33.167V44.833A1.167,1.167,0,0,0,33.167,46H44.833A1.167,1.167,0,0,0,46,44.833V33.167A1.167,1.167,0,0,0,44.833,32ZM33.167,33.167H44.833v5.642l-1.8-1.8a1.167,1.167,0,0,0-1.649,0l-7.825,7.825h-.392ZM44.833,44.833H35.208l7-7,2.625,2.625Zm-8.167-6.417a1.75,1.75,0,1,0-1.75-1.75,1.75,1.75,0,0,0,1.75,1.75Zm0-2.333a.583.583,0,1,1-.583.583A.583.583,0,0,1,36.667,36.083Z"
        transform="translate(-32 -32)"
        fill="#1d1d1d"
      ></path>
    </svg>
  );
}
