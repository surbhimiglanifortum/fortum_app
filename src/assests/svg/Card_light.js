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

function CardLight(props) {
    return (
        <Svg
            width={46}
            height={46}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_iii_1828_1507)">
                <Rect x={1} y={1} width={44} height={44} rx={8} fill="#C4E1D9" />
            </G>
            <Rect
                x={0.5}
                y={0.5}
                width={45}
                height={45}
                rx={8.5}
                stroke="url(#prefix__paint0_linear_1828_1507)"
                strokeOpacity={0.2}
            />
            <Path
                d="M32 15H14a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V17a2 2 0 00-2-2zM12 21h22"
                stroke="#1D9C71"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Path
                d="M32 15H14a2 2 0 00-2 2v12a2 2 0 002 2h18a2 2 0 002-2V17a2 2 0 00-2-2zM12 21h22"
                stroke="#1D9C71"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_1828_1507"
                    x1={42.963}
                    y1={42.412}
                    x2={8.89}
                    y2={43.827}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#D6E3F3" />
                    <Stop offset={1} stopColor="#fff" />
                </LinearGradient>
            </Defs>
        </Svg>
    );
}

export default CardLight;