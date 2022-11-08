import * as React from "react";
import Svg, {
  G,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function WalletLight(props) {
  return (
    <Svg
      width={46}
      height={46}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#prefix__filter0_iii_1775_1507)">
        <Rect x={1} y={1} width={44} height={44} rx={8} fill="#C4E1D9" />
      </G>
      <Rect
        x={0.5}
        y={0.5}
        width={45}
        height={45}
        rx={8.5}
        stroke="url(#prefix__paint0_linear_1775_1507)"
        strokeOpacity={0.2}
      />
      <G clipPath="url(#prefix__clip0_1775_1507)">
        <Path
          d="M27.3 24.6c.417 0 .787-.163 1.113-.488.325-.324.487-.704.487-1.137 0-.417-.162-.783-.487-1.1-.326-.317-.696-.475-1.113-.475-.417 0-.788.158-1.113.475-.325.317-.487.683-.487 1.1 0 .433.163.813.488 1.137.325.326.695.488 1.112.488zm-11.8 4.575V30.5v-15 13.675zm0 2.825c-.383 0-.73-.15-1.037-.45-.309-.3-.463-.65-.463-1.05v-15c0-.383.154-.73.463-1.037.308-.309.654-.463 1.037-.463h15c.4 0 .75.154 1.05.463.3.308.45.654.45 1.037v3.35h-1.5V15.5h-15v15h15v-3.325H32V30.5c0 .4-.15.75-.45 1.05-.3.3-.65.45-1.05.45h-15zm8.95-4.325c-.567 0-1.017-.167-1.35-.5-.333-.333-.5-.775-.5-1.325v-5.675c0-.567.167-1.012.5-1.338.333-.325.783-.487 1.35-.487h6.75c.567 0 1.017.162 1.35.487.333.326.5.771.5 1.338v5.675c0 .55-.167.992-.5 1.325-.333.333-.783.5-1.35.5h-6.75zm7.1-1.5V19.85H24.1v6.325h7.45z"
          fill={"#1D9C71"}
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear_1775_1507"
          x1={42.963}
          y1={42.412}
          x2={8.89}
          y2={43.827}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#D6E3F3" />
          <Stop offset={1} stopColor="#fff" />
        </LinearGradient>
        <ClipPath id="prefix__clip0_1775_1507">
          <Path fill="#fff" transform="translate(11 11)" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default WalletLight;