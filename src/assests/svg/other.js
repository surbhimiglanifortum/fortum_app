import * as React from "react";
import Svg, { Path } from "react-native-svg";
const OtherSvg = (props) => (
  <Svg
    width={20}
    height={3}
    viewBox="0 0 20 3"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <Path
      d="M1.5 2.5C1.21443 2.5 0.987887 2.40578 0.791053 2.20895C0.59422 2.01211 0.5 1.78557 0.5 1.5C0.5 1.21443 0.59422 0.987886 0.791053 0.791053C0.987887 0.594219 1.21443 0.5 1.5 0.5C1.78557 0.5 2.01211 0.59422 2.20895 0.791053C2.40578 0.987886 2.5 1.21443 2.5 1.5C2.5 1.78557 2.40578 2.01211 2.20895 2.20895C2.01211 2.40578 1.78557 2.5 1.5 2.5ZM10 2.5C9.71443 2.5 9.48789 2.40578 9.29105 2.20895L8.9375 2.5625L9.29105 2.20895C9.09422 2.01211 9 1.78557 9 1.5C9 1.21443 9.09422 0.987886 9.29105 0.791053L8.9375 0.437499L9.29105 0.791052C9.48789 0.59422 9.71443 0.5 10 0.5C10.2856 0.5 10.5121 0.59422 10.7089 0.791052L11.0625 0.437499L10.7089 0.791053C10.9058 0.987886 11 1.21443 11 1.5C11 1.78557 10.9058 2.01211 10.7089 2.20895L11.0625 2.5625L10.7089 2.20895C10.5121 2.40578 10.2856 2.5 10 2.5ZM18.5 2.5C18.2144 2.5 17.9879 2.40578 17.7911 2.20895C17.5942 2.01211 17.5 1.78557 17.5 1.5C17.5 1.21443 17.5942 0.987886 17.7911 0.791052C17.9879 0.594219 18.2144 0.5 18.5 0.5C18.7856 0.5 19.0121 0.594219 19.2089 0.791053C19.4058 0.987886 19.5 1.21443 19.5 1.5C19.5 1.78557 19.4058 2.01211 19.2089 2.20895C19.0121 2.40578 18.7856 2.5 18.5 2.5Z"
      fill="white"
      stroke="white"
    />
  </Svg>
);
export default OtherSvg;
