import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const LightBgColor = (props) => (
  <Svg
    width={62}
    height={62}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G filter="url(#filter0_iii_446_6401)">
      <Rect x={1} y={1} width={60} height={60} rx={8} fill="#C4E1D9" />
    </G>
    <Rect
      x={0.5}
      y={0.5}
      width={61}
      height={61}
      rx={8.5}
      stroke="url(#paint0_linear_446_6401)"
      strokeOpacity={0.2}
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_446_6401"
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

export default LightBgColor