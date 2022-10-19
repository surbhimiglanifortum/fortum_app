import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const Charger1 = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <G clipPath="url(#clip0_593_1726)">
      <Path
        d="M20.685 14.7425C20.3081 14.0053 19.7835 13.3396 19.1554 12.7981C20.8455 10.8035 21.6255 8.18939 21.3007 5.56364C21.0877 3.83639 20.3396 2.14551 19.1396 0.67589C18.7946 0.24614 18.2782 -0.000610352 17.7221 -0.000610352H6.2775C5.72137 -0.000610352 5.205 0.245765 4.8615 0.67439C4.224 1.45964 3.71325 2.30526 3.34387 3.18839C2.95762 4.11239 2.72512 5.07276 2.65237 6.04289C2.46675 8.52989 3.243 10.9126 4.84387 12.7978C3.42862 14.0113 2.625 15.7486 2.625 17.6244C2.625 19.3261 3.28725 20.9278 4.49025 22.1349C5.69662 23.3371 7.29825 23.9994 9 23.9994H15C18.5153 23.9994 21.375 21.1396 21.375 17.6244C21.375 16.6216 21.1365 15.6249 20.685 14.7421V14.7425ZM15 23.2498H9C7.49813 23.2498 6.08475 22.6651 5.02087 21.605C3.95963 20.54 3.375 19.1266 3.375 17.6248C3.375 15.8514 4.18988 14.2175 5.61112 13.1428C5.6955 13.0786 5.74913 12.9823 5.7585 12.8769C5.76787 12.7715 5.73225 12.6669 5.66062 12.5889C4.023 10.8151 3.2205 8.51039 3.40013 6.09914C3.46688 5.20926 3.681 4.32726 4.03575 3.47789C4.37775 2.66076 4.85138 1.87664 5.445 1.14539C5.64675 0.893765 5.95012 0.74939 6.2775 0.74939H17.7225C18.0499 0.74939 18.3532 0.893765 18.5573 1.14764C19.6695 2.51001 20.3614 4.06851 20.5568 5.65551C20.871 8.19539 20.0629 10.7229 18.3397 12.5885C18.2681 12.6665 18.2325 12.7708 18.2419 12.8765C18.2513 12.9823 18.3045 13.0783 18.3892 13.1424C19.0676 13.6554 19.6309 14.3266 20.0179 15.0838C20.421 15.8728 20.6257 16.7274 20.6257 17.6244C20.6257 20.726 18.1024 23.2494 15.0007 23.2494L15 23.2498Z"
        fill="#575757"
      />
      <Path
        d="M15.2419 13.5026C17.7563 12.2902 19.5 9.72337 19.5 6.75C19.5 5.02612 18.9011 3.34388 17.814 2.01263C17.7428 1.92563 17.6362 1.875 17.5238 1.875H6.47625C6.36375 1.875 6.25725 1.92563 6.186 2.01263C5.09888 3.34388 4.5 5.02612 4.5 6.75C4.5 9.72337 6.24375 12.2902 8.75812 13.5026C7.62862 13.5169 6.56738 13.9624 5.76488 14.7649C4.94925 15.5809 4.5 16.6631 4.5 17.8125C4.5 20.1904 6.43462 22.125 8.8125 22.125H15.1875C16.3372 22.125 17.4199 21.6757 18.2351 20.8601C19.0507 20.0441 19.5 18.9619 19.5 17.8125C19.5 15.453 17.5946 13.5323 15.2419 13.5026ZM15.9375 5.62875C16.7648 5.62875 17.4375 6.3015 17.4375 7.12875C17.4375 7.956 16.7648 8.62875 15.9375 8.62875C15.1102 8.62875 14.4375 7.956 14.4375 7.12875C14.4375 6.3015 15.1102 5.62875 15.9375 5.62875ZM13.5 3.18712C14.0168 3.18712 14.4375 3.6075 14.4375 4.12462C14.4375 4.64175 14.0168 5.06212 13.5 5.06212C12.9832 5.06212 12.5625 4.64175 12.5625 4.12462C12.5625 3.6075 12.9832 3.18712 13.5 3.18712ZM10.5 3.18712C11.0167 3.18712 11.4375 3.6075 11.4375 4.12462C11.4375 4.64175 11.0167 5.06212 10.5 5.06212C9.98325 5.06212 9.5625 4.64175 9.5625 4.12462C9.5625 3.6075 9.98325 3.18712 10.5 3.18712ZM6.5625 7.12875C6.5625 6.3015 7.23525 5.62875 8.0625 5.62875C8.88975 5.62875 9.5625 6.3015 9.5625 7.12875C9.5625 7.956 8.88975 8.62875 8.0625 8.62875C7.23525 8.62875 6.5625 7.956 6.5625 7.12875ZM8.8125 19.8746C7.6725 19.8746 6.75 18.9521 6.75 17.8121C6.75 16.6721 7.6725 15.7496 8.8125 15.7496C9.9525 15.7496 10.875 16.6721 10.875 17.8121C10.875 18.9521 9.9525 19.8746 8.8125 19.8746ZM9.9375 12.1871C9.11025 12.1871 8.4375 11.5144 8.4375 10.6871C8.4375 9.85988 9.11025 9.18713 9.9375 9.18713C10.7648 9.18713 11.4375 9.85988 11.4375 10.6871C11.4375 11.5144 10.7648 12.1871 9.9375 12.1871ZM10.5 7.12875C10.5 6.3015 11.1727 5.62875 12 5.62875C12.8273 5.62875 13.5 6.3015 13.5 7.12875C13.5 7.956 12.8273 8.62875 12 8.62875C11.1727 8.62875 10.5 7.956 10.5 7.12875ZM12.5625 10.6871C12.5625 9.85988 13.2352 9.18713 14.0625 9.18713C14.8898 9.18713 15.5625 9.85988 15.5625 10.6871C15.5625 11.5144 14.8898 12.1871 14.0625 12.1871C13.2352 12.1871 12.5625 11.5144 12.5625 10.6871ZM15.1875 19.8746C14.0475 19.8746 13.125 18.9521 13.125 17.8121C13.125 16.6721 14.0475 15.7496 15.1875 15.7496C16.3275 15.7496 17.25 16.6721 17.25 17.8121C17.25 18.9521 16.3275 19.8746 15.1875 19.8746Z"
        fill="#575757"
      />
      <Path
        d="M15.1875 18.375C15.4982 18.375 15.75 18.1232 15.75 17.8125C15.75 17.5018 15.4982 17.25 15.1875 17.25C14.8768 17.25 14.625 17.5018 14.625 17.8125C14.625 18.1232 14.8768 18.375 15.1875 18.375Z"
        fill="#575757"
      />
      <Path
        d="M8.8125 18.375C9.12316 18.375 9.375 18.1232 9.375 17.8125C9.375 17.5018 9.12316 17.25 8.8125 17.25C8.50184 17.25 8.25 17.5018 8.25 17.8125C8.25 18.1232 8.50184 18.375 8.8125 18.375Z"
        fill="#575757"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_593_1726">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Charger1;
