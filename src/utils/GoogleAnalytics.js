import ReactGA from "react-ga";

export const initGA = () => {
  ReactGA.initialize("UA-153510541-1", {
    gaOptions: {
      siteSpeedSampleRate: 100, // send 100% of hits to Google Analytics
      debug: true, // TODO remove
    },
  });
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

export const trackEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};
