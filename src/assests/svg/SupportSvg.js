import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SupportSvg = (props) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M9.167 17.5v-1.25h7.083V9.917c0-.806-.173-1.58-.52-2.323a6.68 6.68 0 00-1.396-1.969 6.953 6.953 0 00-2-1.365 5.588 5.588 0 00-4.667 0c-.75.34-1.417.796-2 1.365a6.68 6.68 0 00-1.396 1.969 5.425 5.425 0 00-.52 2.323V15h-.417c-.459 0-.851-.163-1.177-.49a1.605 1.605 0 01-.49-1.177v-1.666c0-.32.076-.601.23-.844a1.83 1.83 0 01.603-.594l.063-1.104c.125-1.014.413-1.93.864-2.75a7.32 7.32 0 011.688-2.083 7.583 7.583 0 017.52-1.323c.841.312 1.595.757 2.261 1.333a7.608 7.608 0 011.677 2.083 7.44 7.44 0 01.865 2.72l.062 1.082c.25.126.452.31.605.553.152.243.229.51.229.802v1.916c0 .306-.077.577-.23.813a1.515 1.515 0 01-.604.541v1.438c0 .347-.121.642-.364.885a1.205 1.205 0 01-.886.365H9.167zM7.5 11.458a.6.6 0 01-.437-.187.623.623 0 01-.188-.459c0-.166.063-.308.188-.427a.643.643 0 01.458-.177.607.607 0 01.604.625.617.617 0 01-.177.438.59.59 0 01-.448.187zm5 0a.6.6 0 01-.437-.187.623.623 0 01-.188-.459c0-.166.063-.308.188-.427a.643.643 0 01.458-.177.607.607 0 01.604.625.617.617 0 01-.177.438.59.59 0 01-.448.187zm-7.479-1.083c-.055-.82.06-1.563.344-2.23A5.157 5.157 0 016.51 6.449a5.042 5.042 0 011.656-1.073A5.016 5.016 0 0110.042 5c1.264 0 2.326.4 3.188 1.198.86.799 1.388 1.795 1.583 2.99-1.306-.014-2.455-.365-3.448-1.053a6.934 6.934 0 01-2.302-2.677 6.654 6.654 0 01-1.406 2.99 6.483 6.483 0 01-2.636 1.927z"
      fill={props.fill || "#1D9C71"}
    />
  </Svg>
);

export default SupportSvg