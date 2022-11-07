import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const DarkBgColor = (props) => (
  <Svg
    width={62}
    height={62}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_iii_806_18462)">
      <Rect x={1} y={1} width={60} height={60} rx={8} fill="#1D9C71" />
    </G>
    <Rect
      x={0.5}
      y={0.5}
      width={61}
      height={61}
      rx={8.5}
      stroke="url(#paint0_linear_806_18462)"
      strokeOpacity={0.2}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_806_18462"
        x1={58.2222}
        y1={57.4706}
        x2={11.7585}
        y2={59.4001}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D6E3F3" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default DarkBgColor