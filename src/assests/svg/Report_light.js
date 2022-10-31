import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Icon(props) {
  return (
    <Svg
      width={38}
      height={38}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#prefix__filter0_iii_1608_1503)">
        <Rect x={1} y={1} width={36} height={36} rx={8} fill="#FAE1E1" />
      </G>
      <Rect
        x={0.5}
        y={0.5}
        width={37}
        height={37}
        rx={8.5}
        stroke="url(#prefix__paint0_linear_1608_1503)"
        strokeOpacity={0.2}
      />
      <Path
        d="M19 23.146a.7.7 0 00.51-.219.7.7 0 00.22-.51.7.7 0 00-.22-.51.7.7 0 00-.51-.22.7.7 0 00-.51.22.7.7 0 00-.22.51.7.7 0 00.22.51.7.7 0 00.51.219zm-.625-3h1.25v-5.48h-1.25v5.48zm-2.5 6.354L11.5 22.125v-6.25l4.375-4.375h6.25l4.375 4.375v6.25L22.125 26.5h-6.25zm.52-1.25h5.21l3.645-3.646v-5.208l-3.646-3.646h-5.208l-3.646 3.646v5.208l3.646 3.646z"
        fill="#FF7878"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_1608_1503"
          x1={35.333}
          y1={34.882}
          x2={7.455}
          y2={36.04}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D6E3F3" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default Icon;