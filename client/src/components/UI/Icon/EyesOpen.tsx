import { IconProps } from "@/types/Icon";

export default function EyesOpen({ className }: IconProps) {
  return (
    <svg className={className} focusable="false" viewBox="0 0 18 11">
      <g transform="translate(-1.258 -5.35)">
        <path
          d="M10.258,5.35h.007a10.283,10.283,0,0,1,8.848,5.309l.145.263-.145.263a10.283,10.283,0,0,1-8.848,5.309H10.25A10.283,10.283,0,0,1,1.4,11.184l-.145-.263.145-.263A10.283,10.283,0,0,1,10.25,5.35Zm7.751,5.572a9.193,9.193,0,0,0-7.751-4.482,9.193,9.193,0,0,0-7.751,4.482A9.193,9.193,0,0,0,10.258,15.4,9.193,9.193,0,0,0,18.008,10.921Z"
          fill="currentColor"
        ></path>
        <path
          d="M2.408-.65A3.058,3.058,0,1,1-.65,2.408,3.062,3.062,0,0,1,2.408-.65Zm0,5.027A1.969,1.969,0,1,0,.439,2.408,1.971,1.971,0,0,0,2.408,4.377Z"
          transform="translate(7.85 8.513)"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
}
