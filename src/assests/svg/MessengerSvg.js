import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";
const MessengerSvg = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0001 2C6.36626 2 2 6.12682 2 11.7003C2 14.6159 3.19519 17.135 5.14089 18.8755C5.30387 19.0224 5.40246 19.2256 5.41051 19.4449L5.46483 21.2236C5.48294 21.791 6.06846 22.1592 6.58759 21.9319L8.57152 21.0566C8.74053 20.9821 8.92766 20.9681 9.10472 21.0163C10.0162 21.2679 10.988 21.4007 12.0001 21.4007C17.634 21.4007 22.0003 17.2738 22.0003 11.7003C22.0003 6.12682 17.634 2 12.0001 2Z"
      fill="url(#paint0_linear_606_1678)"
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.996 14.5373L8.93366 9.87723C9.40047 9.13678 10.4025 8.95166 11.1027 9.47682L13.4388 11.2294C13.654 11.3903 13.9478 11.3883 14.1611 11.2273L17.3161 8.83295C17.7366 8.51302 18.2879 9.01806 18.0042 9.46475L15.0686 14.1228C14.6017 14.8632 13.5997 15.0483 12.8995 14.5232L10.5635 12.7706C10.3482 12.6097 10.0544 12.6117 9.84112 12.7726L6.68413 15.169C6.26361 15.489 5.71229 14.9839 5.996 14.5373Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_606_1678"
        x1={12.0001}
        y1={2}
        x2={12.0001}
        y2={22}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#00B2FF" />
        <Stop offset={1} stopColor="#006AFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default MessengerSvg