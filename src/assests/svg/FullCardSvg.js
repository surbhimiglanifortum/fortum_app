import * as React from "react";
import Svg, { G, Rect, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function Icon(props) {
    return (
        <Svg
            width="100%"
            height="100%"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_ddd_1583_1525)">
                <Rect x={0} y={27}  rx={8} fill="#ECF4FC" />
                <Rect
                    y={26.5}
                    width={336}
                    height={77}
                    rx={8.5}
                    stroke="url(#prefix__paint0_linear_1583_1525)"
                    strokeOpacity={0.46}
                />
            </G>
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_1583_1525"
                    x1={346.491}
                    y1={98.529}
                    x2={95.046}
                    y2={144.555}
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