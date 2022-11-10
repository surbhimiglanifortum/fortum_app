import * as React from "react";
import Svg, { G, Path, Circle, Defs, ClipPath, Rect } from "react-native-svg";
const LocationSvg = (props) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <G
      style={{
        mixBlendMode: "luminosity",
      }}
      clipPath="url(#clip0_606_1438)"
    >
      <Path
        d="M12 8.25C9.9325 8.25 8.25 9.9325 8.25 12C8.25 14.0675 9.9325 15.75 12 15.75C14.0675 15.75 15.75 14.0675 15.75 12C15.75 9.9325 14.0675 8.25 12 8.25ZM12 14.5C10.6212 14.5 9.5 13.3787 9.5 12C9.5 10.6212 10.6212 9.5 12 9.5C13.3787 9.5 14.5 10.6212 14.5 12C14.5 13.3787 13.3787 14.5 12 14.5Z"
        fill={props.fill||"black"}
      />
      <Path
        d="M21.375 11.375H19.4688C19.1663 7.7375 16.2625 4.83375 12.625 4.53125V2.625C12.625 2.28 12.345 2 12 2C11.655 2 11.375 2.28 11.375 2.625V4.53125C7.7375 4.83375 4.83375 7.73875 4.53125 11.375H2.625C2.28 11.375 2 11.655 2 12C2 12.345 2.28 12.625 2.625 12.625H4.53125C4.83375 16.2625 7.7375 19.1663 11.375 19.4688V21.375C11.375 21.72 11.655 22 12 22C12.345 22 12.625 21.72 12.625 21.375V19.4688C16.2625 19.1663 19.1663 16.2625 19.4688 12.625H21.375C21.72 12.625 22 12.3462 22 12C22 11.6562 21.72 11.375 21.375 11.375ZM12 18.25C8.55375 18.25 5.75 15.4462 5.75 12C5.75 8.55375 8.55375 5.75 12 5.75C15.4462 5.75 18.25 8.55375 18.25 12C18.25 15.4462 15.4462 18.25 12 18.25Z"
        fill={props.fill||"black"}
      />
      <Circle cx={12} cy={12} r={2.5} fill={props.fill||"black"} />
    </G>
    <Defs>
      <ClipPath id="clip0_606_1438">
        <Rect width={20} height={20} fill={props.fill||"black"} transform="translate(2 2)" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default LocationSvg