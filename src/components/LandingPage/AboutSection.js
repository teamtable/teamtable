import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Section } from "./styles/Section.styles";
import { trackEvent } from "../../utils/GoogleAnalytics";

// class AboutSection extends Component {
const AboutSection = ({ isVisible, backgroundColor }) => {
  const [isTracked, setIsTracked] = useState(false);

  // isVisible is updated by the enclosing TrackVisibility component from react-on-screen.
  // useEffect hook is called, when one of the props in the last arguments array is changed.
  useEffect(() => {
    if (isVisible && !isTracked) {
      trackEvent("Landingpage", "View", "About");
      setIsTracked(true);
    }
  }, [isVisible, isTracked]);

  return (
    <Section id="about" backgroundColor={backgroundColor} isVisible={isVisible}>
      <Container maxWidth="lg">
        <p>
          TeamTable is an open source alternative to Trello.
          Manage your teams tasks with projects, lists and cards, subtasks and subsubtasks.
          Use drag and drop, custom states, tags and assign users.
        </p>
        <p>Communicate through comments on cards, subtasks, subsubtasks and comments.</p>
        <p>TeamTable is flexible and usable, so signup and improve your collaborate projects workflow.</p>
      </Container>
    </Section>
  );
};

export default AboutSection;
