import React from "react";
import ReactDOM from "react-dom";
import DocumentMeta from "react-document-meta";

// Redux + Thunk
import { Provider } from "react-redux";
import { store } from "./utils/Store";
// import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers/indexReducer';

import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";


// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
const meta = {
  title: "TeamTable: Project Management Web Application | Open Source",
  description: "Open Source Trello alternative for agile project management. Use drag & drop, custom states, nested tasks, tags, comments, chats and assign team members.",
  canonical: "https://teamtable.io",
  meta: {
    charset: "utf-8",
    name: {
      keywords: "projcet management, trello, tool, collaborate, work, team, teamwork, organize, manage, communicate, todo list, kanban, task, webapp, application, open source",
    },
  },
};

ReactDOM.render(
  <Provider store={store}>
    <DocumentMeta {...meta}>
      <App />
    </DocumentMeta>
  </Provider>, document.getElementById("root"),
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
