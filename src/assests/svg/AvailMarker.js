import * as React from "react";
import Svg, { G, Path, Defs, LinearGradient, Stop } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const AvailMarker = (props) => (
  <Svg
    width={77}
    height={86}
    viewBox="0 0 77 86"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    accessibilityRole="image"
    {...props}
  >
    <G filter="url(#filter0_ddd_446_2271)">
      <Path
        d="M39.1996 27C35.9641 27 32.8611 28.2853 30.5732 30.5732C28.2853 32.8611 27 35.9641 27 39.1996C27 45.6432 37.8687 59.2735 38.3345 59.8613C38.4385 59.9908 38.5701 60.0954 38.7199 60.1672C38.8696 60.239 39.0335 60.2763 39.1996 60.2763C39.3657 60.2763 39.5296 60.239 39.6793 60.1672C39.8291 60.0954 39.9608 59.9908 40.0647 59.8613C40.5305 59.2735 51.3992 45.6432 51.3992 39.1996C51.3992 35.9641 50.1139 32.8611 47.826 30.5732C45.5382 28.2853 42.4351 27 39.1996 27Z"
        fill="#10BA66"
      />
      <Path
        d="M37.9427 60.1719L37.9445 60.1742C38.0953 60.3621 38.2864 60.5138 38.5036 60.618C38.7208 60.7222 38.9587 60.7763 39.1996 60.7763C39.4405 60.7763 39.6784 60.7222 39.8956 60.618C40.1129 60.5138 40.3039 60.3621 40.4547 60.1742L40.4565 60.1718L40.4748 60.1488C40.8112 59.7249 43.596 56.2149 46.3263 51.9981C47.7204 49.8451 49.1069 47.4976 50.1466 45.2756C51.1791 43.0691 51.8992 40.9256 51.8992 39.1996C51.8992 35.8315 50.5612 32.6013 48.1796 30.2196C45.7979 27.838 42.5678 26.5 39.1996 26.5C35.8315 26.5 32.6013 27.838 30.2196 30.2196C27.838 32.6013 26.5 35.8315 26.5 39.1996C26.5 40.9256 27.2202 43.0691 28.2526 45.2756C29.2923 47.4976 30.6788 49.8451 32.0729 51.9981C34.8033 56.2152 37.5884 59.7253 37.9245 60.1489L37.9427 60.1719Z"
        stroke="url(#paint0_linear_446_2271)"
        strokeOpacity={0.46}
      />
    </G>
    <Path
      d="M37.4711 50.0967C37.3737 50.0966 37.2817 50.0498 37.2222 49.9699C37.1628 49.8901 37.1424 49.7861 37.1672 49.6884L38.6577 43.8228L35.1947 42.9261C35.1066 42.9035 35.0322 42.8423 34.9909 42.7586C34.9494 42.6749 34.9451 42.5768 34.9788 42.4894L37.4932 35.9798C37.541 35.8563 37.6567 35.7753 37.7852 35.7754H42.1857C42.299 35.7755 42.4035 35.8386 42.4592 35.9406C42.515 36.0427 42.5133 36.168 42.455 36.2685L39.8463 40.7738L43.2061 41.6438C43.3081 41.6706 43.3903 41.7485 43.4252 41.8512C43.46 41.954 43.4431 42.0678 43.3799 42.1549L37.7224 49.9665C37.663 50.0484 37.5699 50.0967 37.471 50.0967L37.4711 50.0967Z"
      fill="white"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_446_2271"
        x1={50.2696}
        y1={58.3189}
        x2={31.3599}
        y2={58.8947}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#D6E3F3" />
        <Stop offset={1} stopColor="white" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default AvailMarker;