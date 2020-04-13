import styled, { css } from "styled-components";
import { fontLight } from "../../../lib/styles/colors";

export const Section = styled.section`
  ${props => props.backgroundColor && css`
    background: ${props.backgroundColor};
  `}

  color: ${fontLight};
  padding-top: 96px;
  padding-right: 40px;
  padding-bottom: 96px;
  padding-left: 40px;
  ${props => props.paddingVertical && css`
    padding-top: ${props.paddingVertical};
    padding-bottom: ${props.paddingVertical};
  `}
  width: 100vw;
  overflow: hidden;
  section: 100vw;
  h2 {
    text-align: center;
    color: white;
  };

  h3 {
    text-align: center;
  }
`;
