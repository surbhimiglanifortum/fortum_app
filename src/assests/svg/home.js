import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeSvg = (props) => (
  <Svg
    width={18}
    height={20}
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <Path
      d="M0 20V6.66667L9.05625 0L18 6.66667V20H11.4187V12.0833H6.55312V20H0ZM1.6875 18.3333H4.86562V10.4167H13.1062V18.3333H16.3125V7.5L9.05625 2.08333L1.6875 7.5V18.3333Z"
      fill="#EBECEF"
    />
  </Svg>
);
export default HomeSvg;