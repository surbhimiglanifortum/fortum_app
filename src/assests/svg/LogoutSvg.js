import * as React from "react";
import Svg, { Path } from "react-native-svg";
const LogoutSvg = (props) => (
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
      d="M3.66667 22C3.22222 22 2.83333 21.8333 2.5 21.5C2.16667 21.1667 2 20.7778 2 20.3333V3.66667C2 3.22222 2.16667 2.83333 2.5 2.5C2.83333 2.16667 3.22222 2 3.66667 2H11.75V3.66667H3.66667V20.3333H11.75V22H3.66667ZM17.1667 16.8611L15.9722 15.6667L18.8056 12.8333H9.08333V11.1667H18.75L15.9167 8.33333L17.1111 7.13889L22 12.0278L17.1667 16.8611Z"
      fill="white"
    />
  </Svg>
);

export default LogoutSvg