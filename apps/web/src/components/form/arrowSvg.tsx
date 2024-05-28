import { forwardRef } from "react";
import { Box, css, styled } from "@mui/system";

/**
 * Component usage:
 * <ArrowSvg direction="down" />
*/
const Arrow = styled(Box)<any>(({ direction }) => ({
  transition: "transform 300ms",
  transform: direction === "up"
    ? "rotate(-90deg)"
    : direction === "down"
      ? "rotate(90deg)"
      : direction === "left"
        ? "rotate(180deg)"
        : "rotate(0deg)",
  "&[data-state='open']": {
    transform: direction === "up"
      ? "rotate(90deg)"
      : direction === "down"
        ? "rotate(-90deg)"
        : direction === "left"
          ? "rotate(0deg)"
          : "rotate(180deg)"
  }
}));

const ArrowSvg = forwardRef<HTMLDivElement, any>(
  ({ width = 8, direction = "right", ...props }, ref) => (
    <Arrow
      ref={ref}
      component="svg"
      viewBox="0 0 8 13"
      fill="none"
      css={css({ width, height: "auto" })}
      direction={direction}
      {...props}
    >
      <path
        d="M1.41.815 0 2.225l4.58 4.59L0 11.405l1.41 1.41 6-6-6-6Z"
        fill="#fff"
      />
    </Arrow>
  )
);

ArrowSvg.displayName = "ArrowSvg";

export default ArrowSvg;