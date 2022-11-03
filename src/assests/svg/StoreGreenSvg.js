import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "../../Utils/colors";
const StoreGreenSvg = (props) => (
  <Svg
    width={30}
    height={30}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <Path
      d="M3.20713 4.6875V3H20.8203V4.6875H3.20713ZM3.34431 21V13.7438H2V12.0563L3.20713 6.375H20.7929L22 12.0563V13.7438H20.6557V21H19.0096V13.7438H13.8244V21H3.34431ZM4.9904 19.3125H12.1783V13.7438H4.9904V19.3125ZM3.61866 12.0563H20.3813H3.61866ZM3.61866 12.0563H20.3813L19.5309 8.0625H4.46914L3.61866 12.0563Z"
      fill={colors.green}
    />
  </Svg>
);


export default StoreGreenSvg