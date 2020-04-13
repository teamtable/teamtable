import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Section } from "./styles/Section.styles";
import { FooterText } from "./styles/Footer.styles";
import { trackEvent } from "../../utils/GoogleAnalytics";

// class AboutSection extends Component {
const Footer = ({ isVisible, backgroundColor }) => {
  const [isTracked, setIsTracked] = useState(false);

  useEffect(() => {
    if (isVisible && !isTracked) {
      trackEvent("Landingpage", "View", "Footer");
      setIsTracked(true);
    }
  }, [isVisible, isTracked]);

  return (
    <Section backgroundColor={backgroundColor} paddingVertical="48px">
      <Container maxWidth="lg">
        <FooterText>
          © 2019 - Designed and developed by
          <a
            href="https://www.linkedin.com/in/janis-schanbacher/"
            onClick={() => trackEvent("Contact", "click: Janis Schanbacher", "Github")}
          > Janis Schanbacher
          </a> and
          <a
            href="https://www.linkedin.com/in/flo-wolf/"
            onClick={() => trackEvent("Contact", "click: Florian Wolf", "Github")}
          > Florian Wolf
          </a>.<br />
          Email: <a href="mailto:info@teamtable.io" onClick={() => trackEvent("Contact", "Click: info@teamtable.io", "Email")}>info@teamtable.io</a>
        </FooterText>
      </Container>
    </Section>
  );
};

export default Footer;
