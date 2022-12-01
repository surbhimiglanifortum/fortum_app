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
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10 14.146a.7.7 0 00.51-.219.7.7 0 00.22-.51.7.7 0 00-.22-.51.7.7 0 00-.51-.22.7.7 0 00-.51.22.7.7 0 00-.22.51.7.7 0 00.22.51.7.7 0 00.51.219zm-.625-3h1.25v-5.48h-1.25v5.48zm-2.5 6.354L2.5 13.125v-6.25L6.875 2.5h6.25L17.5 6.875v6.25L13.125 17.5h-6.25zm.52-1.25h5.21l3.645-3.646V7.396L12.604 3.75H7.396L3.75 7.396v5.208l3.646 3.646z"
        fill={props.fill || "#FF7878"}
      />
    </Svg>
  );
}

export default Icon;