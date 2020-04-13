import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ReactSVG from "react-svg";
import Typography from "@material-ui/core/Typography";

export const StyledButton = styled(Button)`
  float: right;
  margin-right: 20px;
`;

export const LogoIconSvg = styled(ReactSVG)`
  height: 30px;
  width: 30px;
  margin-top: -30px;
  margin-right: 10px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export const SiteName = styled(Typography)`
  cursor: pointer;
`;
