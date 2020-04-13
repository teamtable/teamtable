import React from "react";
import { withRouter } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import { CallToActionWrapper, HeadStatementWrapper, ActionButtonWrapper } from "./styles/CallToAction.styles";
import { history } from "../../utils/history";
import { trackEvent } from "../../utils/GoogleAnalytics";

const CallToAction = () => (
  <CallToActionWrapper item alignContent="center">
    <HeadStatementWrapper>
      <h1>TeamTable</h1>
      <h2> Open Source Project Management Webapp</h2>
    </HeadStatementWrapper>
    <ActionButtonWrapper>
      <Fab
        variant="extended"
        color="primary"
        aria-labelledby="Sign up"
        m="auto"
        onClick={() => {
          history.push("signup");
          trackEvent("Sign-Up", "Click: Sign up", "Action button");
        }}
      >
        Take a seat!
      </Fab>
    </ActionButtonWrapper>
  </CallToActionWrapper>
);

export default withRouter(CallToAction);
