import styled from "styled-components";
import ReactSVG from "react-svg";
import Background from "../../../images/team-at-a-table.jpg";
import { darkGray } from "../../../lib/styles/colors";

// export const FirstSectionWrap = styled.div`
//   background: -webkit-linear-gradient(60deg, #2d3544, #1c2533);
//   background: linear-gradient(60deg, #2d3544, #1c2533);
//   background: #2d3544;
//   background-size: cover;
//   background-image: url("/public/images/landingpage-bg-full.jpg");
// `;

// export const AuthWrap = styled.div`
//   position: relative;
//   z-index: 3;
//   right: 2%;
//   bottom: 1%;
//   float: right;
//   height: 100vh;
//   width: 450px;
//   [theme.breakpoints.down("md")]: {
//     height: 100vh;
//     width: 450px;
//     position: absolute;
//     left: 0;
//     right: 0;
//     top: 0;
//     bottom: 0;
//     margin-left: auto;
//     margin-right: auto;
//     margin-top: auto;
//     margin-bottom: auto;
//   };
// `;

export const AuthWrap = styled.div`
  margin-top: 30vh;
  width: 100%;
  z-index: 0;
  display: inline-block;
`;

export const BackgroundImage = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100vh;
  background-image: url(${Background});
  background-position: center;
  background-size: cover;
  [theme.breakpoints.down("md")]: {
    height: 100%;
    width: 100%;
  };
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(23,23,23,0.6);
`;

export const LandingAuthBarWrap = styled.div`
  position: relative;
  right:2%;
  bottom: 1%;
  float:right;
  height: 100vh;
  width: 450px;
`;

export const LandingLoginWrap = styled.div`
  margin: 0 auto;
  bottom: 0;
  width: 350px;
  max-width: 90%;
  padding-bottom: 60px;
`;

export const LandingLoginInner = styled.div`
  padding: 20px 30px 5px 30px;
`;


export const LandingLoginLogo = styled.div`
  width: 100%;
  padding-bottom: 30px;
  padding-top:10px;
`;

export const LogoIconSvg = styled(ReactSVG)`
  margin: 0 auto;
  height:60px;
  width: 60px;
  pointer-events: none;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
`;
