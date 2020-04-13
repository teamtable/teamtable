import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

export const GridWrapper = styled.div`
  flex-grow: 1
`;

export const StyledPaper = styled(Paper)`
  padding: 10px;
  text-align: 'center';
  margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  height: 100px;
  overflow: hidden;

  h4 {
    font-weight: 500;
    color: #333;
    font-size: 21px;
  }
  p {
    color: #333;
    font-size: 18px;
  }
`;

export const StyledTypography = styled(Typography)`
  text-align: left;
`;
