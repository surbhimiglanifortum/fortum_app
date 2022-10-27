import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FaceBookSvg = (props) => (
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
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="#3B5998"
    />
    <Path
      d="M14.514 12.3916H12.7296V18.9288H10.0261V12.3916H8.74036V10.0942H10.0261V8.60754C10.0261 7.5444 10.5312 5.87964 12.7537 5.87964L14.7563 5.88802V8.11804H13.3033C13.0649 8.11804 12.7298 8.23712 12.7298 8.74427V10.0964H14.7502L14.514 12.3916Z"
      fill="white"
    />
  </Svg>
);

export default FaceBookSvg