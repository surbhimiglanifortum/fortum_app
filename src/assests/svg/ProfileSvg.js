import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ProfileSvg = (props) => (
  <Svg
    width={96}
    height={96}
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_761_1166)">
      <Path
        d="M48 0.00195312C21.4931 0.00195312 0 21.4908 0 47.9998C0 74.5088 21.491 95.9977 48 95.9977C74.5111 95.9977 96 74.5088 96 47.9998C96 21.4908 74.5111 0.00195312 48 0.00195312ZM48 14.3539C56.771 14.3539 63.8784 21.4634 63.8784 30.2302C63.8784 38.9991 56.771 46.1065 48 46.1065C39.2332 46.1065 32.1258 38.9991 32.1258 30.2302C32.1258 21.4634 39.2332 14.3539 48 14.3539ZM47.9895 83.4485C39.2417 83.4485 31.2297 80.2627 25.05 74.9896C23.5446 73.7055 22.6759 71.8227 22.6759 69.8472C22.6759 60.956 29.8719 53.8401 38.7652 53.8401H57.239C66.1344 53.8401 73.303 60.956 73.303 69.8472C73.303 71.8248 72.4385 73.7034 70.931 74.9875C64.7534 80.2627 56.7393 83.4485 47.9895 83.4485Z"
        fill={props.fill||"#CAE4DD"}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_761_1166">
        <Rect width={96} height={96} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default ProfileSvg