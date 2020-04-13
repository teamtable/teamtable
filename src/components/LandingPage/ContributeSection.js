import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import GavelIcon from "@material-ui/icons/Gavel";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Container from "@material-ui/core/Container";
import { Section } from "./styles/Section.styles";
import { ContributeWrapper, DonateWrapper } from "./styles/ContributeSection.styles";
import { trackEvent } from "../../utils/GoogleAnalytics";

const ContributeSection = ({ isVisible, backgroundColor }) => {
  const [isTracked, setIsTracked] = useState(false);

  useEffect(() => {
    if (isVisible && !isTracked) {
      trackEvent("Landingpage", "View", "Contribute");
      setIsTracked(true);
    }
  }, [isVisible]);

  return (
    <Section id="contribute" backgroundColor={backgroundColor}>
      <Container maxWidth="lg">
        <h2>Contribute</h2>
        <h3>TeamTable is open source</h3><br />
        <p> Help to improve TeamTable to make it become the best project management application.</p>
        <p> The frontend application is built with ReactJS and Redux. The RESTful backend api is built with Ruby on Rails.</p>
        <ContributeWrapper>
          <Fab
            variant="extended"
            color="primary"
            aria-labelledby="Contribute"
            m="auto"
            href="https://github.com/janis-schanbacher"
            onClick={() => trackEvent("Contribute", "Click: Take a hammer!", "Github")}
          >
            <GavelIcon />
          Take a Hammer!
          </Fab>
        </ContributeWrapper>
        <DonateWrapper>
          <Fab
            variant="extended"
            color="primary"
            aria-label="Donate"
            m="auto"
            href="https://paypal.me/teamtable"
            onClick={() => trackEvent("Contribute", "Click: Donate", "Paypal")}
          >
            <AttachMoneyIcon />
            Donate
          </Fab>
        </DonateWrapper>
      </Container>
    </Section>
  );
};

export default ContributeSection;
