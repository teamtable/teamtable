# Teamtable API

Teamtable is a project management web application made for the web development course at HTW Berlin by [Florian Wolf](https://github.com/flo-wolf) and [Janis Schanbacher](https://github.com/janis-schanbacher).
This repository is the WIP [React](https://reactjs.org/) frontend and can be testet at: [teamtable.io](http://teamtable.io). The Ruby on Rails backend can be found [here](https://github.com/teamtable/teamtable-api).

## Getting started

### Prerequisites
- [npm](https://www.npmjs.com/package/npm)
- [Node](https://nodejs.org/en/)

### Installation

- Clone the repository to your local machine
  ```sh
  $ git clone https://github.com/teamtable/teamtable.git
  ```
- Install all dependencies from within the repository
  ```sh
  $ cd teamtable
  $ npm install
  ```
## Usage
- Start the server in development mode
  ```sh
  $ npm start
  ```
- Open [http://localhost:3000](http://localhost:3000) in the browser.


## Features

### Current
- Authenticate users via JWT
- Multi-tab sidebar menu (navigation, chat, notifications)
- Users can create Projects, to which members can be assigned to. All assigned members gain access to the project
- Each project contains a 'workspace', made up of many lists. Each list can contain many cards (todos)
- Cards can be checked as done. Currently the due progress, labels and avatars are only placeholders
- List and card drag and dropping. Sorting is saved via API calls and restored on page refreshes
- Create, edit and delete: Cards, Lists, Projects
- SEO-optimized landingpage, not yet server-side rendered

### Planned
- Extended card editing, including a due-date, assigning users to the task, adding labels
- Labels for cards and lists
- Notifications accessable via the sidebar notifications-tab
- Multi-channel chat accessable via the sidebar chat-tab (utilizing 'server-sockets')
- Profile page, including name edit, avatar edit, email edit
- Settings page, including language switch, card display options
- Dark theme
