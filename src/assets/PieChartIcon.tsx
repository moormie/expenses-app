import { FC } from "react";

interface Props {
  width?: string;
  height?: string;
  color?: string;
}

export const PieChart: FC<Props> = ({
  width = "20",
  height = "20",
  color = "currentColor",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={color}
      className="bi bi-bar-chart-fill"
      viewBox="0 0 16 16"
    >
      <path d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z" />
    </svg>
  );
};