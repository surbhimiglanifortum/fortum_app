import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const ReportDark = (props) => (
  <Svg
    width={38}
    height={38}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_iii_806_15565)">
      <Rect x={1} y={1} width={36} height={36} rx={8} fill="#FF7878" />
    </G>
    <Rect
      x={0.5}
      y={0.5}
      width={37}
      height={37}
      rx={8.5}
      stroke="url(#paint0_linear_806_15565)"
      strokeOpacity={0.2}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_806_15565"
        x1={35.3333}
        y1={34.8823}
        x2={7.4551}
        y2={36.04}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D6E3F3" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default ReportDark;
