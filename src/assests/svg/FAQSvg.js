import * as React from "react";
import Svg, { Path } from "react-native-svg";

function FAQSvg(props) {
  return (
    <Svg
      width={22}
      height={22}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
        stroke="#1D9C71"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.09 8a3 3 0 015.83 1c0 2-3 3-3 3M11 16h.01"
        stroke="#1D9C71"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}


export default FAQSvg