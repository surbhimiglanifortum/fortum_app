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

function ChargerLight(props) {
    return (
        <Svg
            width={46}
            height={46}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_iii_1759_1504)">
                <Rect x={1} y={1} width={44} height={44} rx={8} fill="#C4E1D9" />
            </G>
            <Rect
                x={0.5}
                y={0.5}
                width={45}
                height={45}
                rx={8.5}
                stroke="url(#prefix__paint0_linear_1759_1504)"
                strokeOpacity={0.2}
            />
            <Path
                d="M19.425 29.65l2.2-3.5H20.3v-2.625l-2.175 3.5h1.3v2.625zM16.5 21.2h6.725v-5.7H16.5v5.7zm0 9.3h6.725v-7.8H16.5v7.8zM15 32V15.5c0-.4.15-.75.45-1.05.3-.3.65-.45 1.05-.45h6.725c.4 0 .75.15 1.05.45.3.3.45.65.45 1.05v7.2h1.625c.35 0 .646.12.887.363.242.241.363.537.363.887v5.475c0 .367.146.67.438.912.291.242.629.363 1.012.363s.742-.12 1.075-.363c.333-.241.5-.545.5-.912V19.75h-.375a.728.728 0 01-.75-.75v-2.25h.5V15.5h.75v1.25h1V15.5h.75v1.25h.5V19a.728.728 0 01-.75.75h-.375v9.675c0 .717-.283 1.325-.85 1.825S29.8 32 29.05 32c-.733 0-1.367-.25-1.9-.75-.533-.5-.8-1.108-.8-1.825V23.95h-1.625V32H15zm8.225-1.5H16.5h6.725z"
                fill="#1D9C71"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_1759_1504"
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

export default ChargerLight;