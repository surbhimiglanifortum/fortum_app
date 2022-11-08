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

function SupportLight(props) {
    return (
        <Svg
            width={38}
            height={38}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G filter="url(#prefix__filter0_iii_1610_1504)">
                <Rect x={1} y={1} width={36} height={36} rx={8} fill="#C4E1D9" />
            </G>
            <Rect
                x={0.5}
                y={0.5}
                width={37}
                height={37}
                rx={8.5}
                stroke="url(#prefix__paint0_linear_1610_1504)"
                strokeOpacity={0.2}
            />
            <Path
                d="M18.166 26.5v-1.25h7.084v-6.333c0-.806-.174-1.58-.521-2.323a6.68 6.68 0 00-1.396-1.969 6.954 6.954 0 00-2-1.365 5.588 5.588 0 00-4.666 0c-.75.34-1.417.796-2 1.365a6.68 6.68 0 00-1.396 1.969 5.424 5.424 0 00-.521 2.323V24h-.417c-.458 0-.85-.163-1.177-.49a1.605 1.605 0 01-.49-1.177v-1.666c0-.32.077-.601.23-.844.152-.243.354-.441.604-.594l.062-1.104c.125-1.014.414-1.93.865-2.75a7.32 7.32 0 011.687-2.083 7.58 7.58 0 012.271-1.323A7.439 7.439 0 0119 11.5c.916 0 1.795.156 2.635.469.84.312 1.594.757 2.26 1.333a7.61 7.61 0 011.678 2.083c.451.813.74 1.72.864 2.72l.063 1.082c.25.125.451.31.604.553.153.243.23.51.23.802v1.916c0 .306-.077.577-.23.813a1.515 1.515 0 01-.604.541v1.438c0 .347-.122.642-.365.885a1.205 1.205 0 01-.885.365h-7.084zM16.5 20.458a.6.6 0 01-.438-.187.623.623 0 01-.187-.459c0-.166.062-.309.187-.427a.643.643 0 01.459-.177.607.607 0 01.604.625.617.617 0 01-.177.438.59.59 0 01-.448.187zm5 0a.6.6 0 01-.438-.187.623.623 0 01-.187-.459c0-.166.062-.309.187-.427a.643.643 0 01.459-.177.607.607 0 01.604.625.617.617 0 01-.177.438.59.59 0 01-.448.187zm-7.48-1.083c-.055-.82.06-1.563.344-2.23a5.157 5.157 0 011.146-1.697 5.04 5.04 0 011.656-1.073A5.016 5.016 0 0119.041 14c1.264 0 2.327.4 3.188 1.198.861.798 1.389 1.795 1.583 2.99-1.305-.014-2.454-.365-3.448-1.053a6.933 6.933 0 01-2.302-2.677 6.653 6.653 0 01-1.406 2.99 6.484 6.484 0 01-2.635 1.927z"
                fill="#1D9C71"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear_1610_1504"
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

export default SupportLight;