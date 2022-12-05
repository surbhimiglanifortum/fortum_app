import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HelperSvg = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      stroke="#C9FDEB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9.08984 8.99959C9.32495 8.33126 9.789 7.7677 10.3998 7.40873C11.0106 7.04975 11.7287 6.91853 12.427 7.0383C13.1253 7.15808 13.7587 7.52112 14.2149 8.06312C14.6712 8.60512 14.9209 9.29112 14.9198 9.99959C14.9198 11.9996 11.9198 12.9996 11.9198 12.9996"
      stroke="#C9FDEB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17H12.01"
      stroke="#C9FDEB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HelperSvg
