import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { Section } from "./styles/Section.styles";
import { StyledDashboardScreenshot } from "./styles/FeatureSection1.styles";
import DashboardScreenshot from "../../images/DashboardScreenshot.png";
import Carousel from "../molecules/Carousel";
import { trackEvent } from "../../utils/GoogleAnalytics";

const FeatureSection1 = ({ isVisible, backgroundColor }) => {
  const [isTracked, setIsTracked] = useState(false);

  useEffect(() => {
    if (isVisible && !isTracked) {
      trackEvent("Landingpage", "View", "Features");
      setIsTracked(true);
    }
  }, [isVisible]);

  return (
    <Section id="features" backgroundColor={backgroundColor} style={{ marginBottom: "-10px" }}>
      <Container maxWidth="lg">
        <h2>Easy to use</h2>
        <h3>Overview at a glance</h3>
        <br />
        <p>
          View title, state, tags, progress and assigned members at a glance, click the cards for details and editing.
          Drag and drop cards for Kanban-like usage.
        </p>
        <p>Use custom states such as todo, doing, hold, done or the traditional checkbox mode. </p>
        <br />
        <Carousel
          slides={[
            {
              width: "1280",
              height: "720",
              url: "/images/landingpage/projects-dashboard.jpg",
              title: "Projects dashboard",
              alt: "Projects dashboard",
            },
            {
              width: "1280",
              height: "720",
              url: "/images/landingpage/project-workspace-field-todo-lists.jpg",
              title: "Project workspace with todo lists for work fields",
              alt: "Project workspace with todo lists for work fields",
            },
            {
              width: "1280",
              height: "720",
              url: "/images/landingpage/project-workspace-kanban-sidebar.jpg",
              title: "Project workspace of a Kanban project with sidebar open",
              alt: "Project workspace of a Kanban project with sidebar open",
            },
            {
              width: "1280",
              height: "720",
              url: "/images/landingpage/project-workspace-add-list.jpg",
              title: "Add a new list",
              alt: "Add a new list",
            },
            {
              width: "1280",
              height: "720",
              url: "/images/landingpage/projects-dashboard-edit-a-project.jpg",
              title: "Edit a project and add members",
              alt: "Edit a project and add members",
            },
          ]}
        />
      </Container>
    </Section>
  );
};
export default FeatureSection1;
