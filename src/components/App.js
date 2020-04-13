import React, { Component } from "react";
import { Router, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "redux-thunk";

import { history } from "../utils/history.js";
import Sidebars from "./Sidebar/Sidebars";
import Content from "./Content/Content";
import { PrivateRoute } from "./_common/PrivateRoute";

import "./App.scss";
import LandingPage from "./LandingPage/LandingPage";

import Layout from "../utils/layout";

/* BASIC REACT-REDUX INTRODUCTION - /fw */
/* Component Tree Model */
// This component is rendered first and renders all sub components, which are included above.
// Sub components can render multiple own sub-components.

/* What are States */
// To pass data, this tree of components works like a waterfall.
// Data is saved in "states" (which are handled by react-redux).
// Any component can hold data in its state.
// This data can either be an object or a function.

/* How to propagate data */
// When a parent component renders child components, it can pass its state by adding them as attributes to the HTML.
// The passed data can be used in the child component directly or it can be passed down further the component tree.
// Child components can change the state of any parent component by calling functions inside those parent components,
// which need to be referenced in the state which was propagated down the component tree.
class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
  }

  // Head of rendering.
  render() {
    // get authentication info from the props as well as user info containing projects
    const { isAuthenticated, user, alert } = this.props;

    const GuestContent = props => (
      <div className="app-wrap">
        <LandingPage />
      </div>
    );

    const UserContent = props => (
      <div className="app-wrap">
        {console.log("Rendering UserContent")}
        <Sidebars />
        <Content />
      </div>
    );

    //

    // render navigation including collapsable sidebar and the sidebar switch actionbar
    // also set up routing for the content. Content can be put into its own component later on.
    return (
      <Layout>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/login" component={GuestContent} />
              <Route exact path="/signup" component={GuestContent} />
              <Route exact path="/" component={GuestContent} />
              <PrivateRoute path="/dashboard" component={UserContent} />
              <PrivateRoute path="/projects" component={UserContent} />
            </Switch>
          </div>
        </Router>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { alert } = state;
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.currentUser,
    alert,
  };
};

export default App = connect(mapStateToProps)(App);

/*
<CollapsableSidebar {...this.state} />
*/

/*
       const guestViews = (
           <div id="landing-page" className="wrapper">
               <Navigation isAuthenticated={isAuthenticated} />
               <Route exact path="/" component={LandingPage} />
               <Route exact path="/projects" component={Projects} />
           </div>
       );


       const userViews = (
           <div className="wrapper">
               <Navigation isAuthenticated={isAuthenticated} />
               <Route exact path="/" component={LandingPage} />
               <Route exact path="/about" component={About} />
               <Route exact path="/health_resources" component={HealthResources} />
               <Route exact path="/entries" component={UserEntries} />
               <Route exact path="/user_profile" render={() => <UserProfile user={user}/>} />
               <Footer/>
           </div>
       );

       return (
           <Router>
               {isAuthenticated ? userViews : guestViews}
               guestViews
           </Router>
       );

       */


// isSidebarOpen={this.state.isSidebarOpen} sidebarType={this.state.sidebarType} toggleSidebarCollapse={this.toggleSidebarCollapse}
