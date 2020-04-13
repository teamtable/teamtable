import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import PlannedFeatureTaskNesting from "./PlannedFeatureTaskNesting";
import PlannedFeatureNotifications from "./PlannedFeatureNotifications";
import PlannedFeatureChat from "./PlannedFeatureChat";
import { Section } from "./styles/Section.styles";
import { GridWrapper } from "./styles/PlannedFeature.styles";
import { TodoList } from "../Content/Workspace/TodoList";
import PlannedFeatureAttachment from "./PlannedFeatureAttachment";
import { trackEvent } from "../../utils/GoogleAnalytics";

export const PlannedFeaturesSection = ({ isVisible, backgroundColor }) => {
  const [isTracked, setIsTracked] = useState(false);

  useEffect(() => {
    if (isVisible && !isTracked) {
      trackEvent("Landingpage", "View", "Planned-Features");
      setIsTracked(true);
    }
  }, [isVisible]);

  return (
    <Section id="planned" backgroundColor={backgroundColor}>
      <Container maxWidth="lg">
        <h2>Planned Features</h2>
        <h3>Features that are planned or in progress</h3>
        <br />
        <GridWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <PlannedFeatureChat />
            </Grid>
            <Grid item xs={12} md={6}>
              <PlannedFeatureNotifications />
            </Grid>
            <Grid item xs={12} md={6}>
              <PlannedFeatureTaskNesting />
            </Grid>
            <Grid item xs={12} md={6}>
              <PlannedFeatureAttachment />
            </Grid>
          </Grid>
        </GridWrapper>
      </Container>
    </Section>
  );
};

export default PlannedFeaturesSection;
