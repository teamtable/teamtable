import React, { Component } from "react";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import connect from "react-redux/es/connect/connect";
import { Route, Switch } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import CallToAction from "./CallToAction";
import AboutSection from "./AboutSection";
import FeatureSection1 from "./FeatureSection1";
import ContributeSection from "./ContributeSection";
import Footer from "./Footer";
import {
  FirstSectionWrap,
  BackgroundImage,
  BackgroundOverlay,
  AuthWrap,
  LandingAuthBarWrap,
  LandingLoginWrap,
  LandingLoginInner,
  LandingLoginLogo,
  LogoIconSvg,
} from "./styles/LandingPage.styles";
import { history } from "../../utils/history";
import { alertActions } from "../../_actions/alertActions";
import TeamtableIcon from "../../images/logo-blue.svg";
import PlannedFeaturesSection from "./PlannedFeaturesSection";
import { grayHex, darkGray } from "../../lib/styles/colors";
import Navbar from "../Navbar/Navbar";
import { logPageView } from "../../utils/GoogleAnalytics";
import TrackVisibility from 'react-on-screen';

// TODO: check if neccessary, if so rewrite as styled component
// const styles = theme => ({
//   root: {
//     ...theme.mixins.gutters(),
//     paddingTop: theme.spacing.unit * 2,
//     paddingBottom: theme.spacing.unit * 2,
//   },
// });

const Form = () => (
  <AuthWrap>
    <LandingLoginWrap>
      <Paper elevation={10}>
        <LandingLoginInner>
          <LandingLoginLogo>
            <LogoIconSvg src={TeamtableIcon} />
          </LandingLoginLogo>
          <Switch>
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login" component={LoginForm} />
          </Switch>
        </LandingLoginInner>
      </Paper>
    </LandingLoginWrap>
  </AuthWrap>
);

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
    };

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
      logPageView();
    });
  }

  render() {
    return (
      <span>
        <Navbar />
        <BackgroundImage alt="Team working at a table"> {/* TODO the other way round, overlay that is transparent, but not over letters */}
          <BackgroundOverlay>
            <Switch>
              <Route exact path="/" component={CallToAction} />
              <Route exact path="/signup">
                <Form />
              </Route>
              <Route exact path="/login">
                <Form />
              </Route>
            </Switch>
          </BackgroundOverlay>
        </BackgroundImage>
        <Grid container spacing={2} direction="column">
          <Grid item xs={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TrackVisibility partialVisibility>
              <AboutSection backgroundColor={darkGray} />
            </TrackVisibility>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TrackVisibility partialVisibility>
              <FeatureSection1 backgroundColor={grayHex} />
            </TrackVisibility>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TrackVisibility partialVisibility>
              <PlannedFeaturesSection backgroundColor={darkGray} />
            </TrackVisibility>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TrackVisibility partialVisibility>
              <ContributeSection backgroundColor={grayHex} />
            </TrackVisibility>
          </Grid>
          <Grid item xs={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
            <TrackVisibility partialVisibility>
              <Footer backgroundColor={darkGray} />
            </TrackVisibility>
          </Grid>
        </Grid>
      </span>
    );
  }
}

export default LandingPage = connect()(LandingPage);

/*
<Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
 */
