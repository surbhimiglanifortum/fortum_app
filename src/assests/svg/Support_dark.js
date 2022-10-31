import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SupportDark(props) {
    return (
        <Svg
            width={38}
            height={38}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_iii_806_15573)">
                <Rect x={1} y={1} width={36} height={36} rx={8} fill="#1D9C71" />
            </G>
            <Rect
                x={0.5}
                y={0.5}
                width={37}
                height={37}
                rx={8.5}
                stroke="url(#prefix__paint0_linear_806_15573)"
                strokeOpacity={0.2}
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_806_15573"
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

export default SupportDark;