# Contributing to Resumake

## Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](./code-of-conduct.md). By participating in this project you agree to abide by its terms.

---

Thanks very much for taking the time to contribute! Here's a Table of Contents that should cover mostly everything you may be interested in:

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Technology Stack](technology-stack)
4. [Setting Up](#setting-up)
5. [Contributing Client Changes](#contributing-client-changes)
6. [Contributing Server Changes](#contributing-server-changes)
7. [Submitting Issues](#submitting-issues)

## Project Overview
The way this app works is pretty simple. There is a form where the user enters in their data. When the user presses the <kbd>MAKE</kbd> button, all that form data is sent to the server. Upon receiving that data, the server checks to see what template was selected, and generates a specific TeX document based on that.

It then runs a [`latex`](https://github.com/saadq/node-latex/) child process on the generated TeX document which will generate a PDF. The PDF is then sent back to the client which will render it in the preview.

## Requirements
The following are the requirements for installing and running the application locally.

* Node v7.6+
* npm v5+
* [LaTeX](https://www.latex-project.org/get/)

## Technology Stack
This webapp is a fullstack JavaScript project hosted on a DigitalOcean droplet. [Flow](https://flow.org/) is used for type safety and [Jest](facebook.github.io/jest/) is used for tests. Don't worry if any of this stuff is new to you, it's actually easier than you may think.

* [Learn Flow](https://flow.org/en/docs/getting-started/)
* [Learn Jest](http://facebook.github.io/jest/docs/en/getting-started.html)

**Frontend**
* React
* Redux
* Styled-Components
* Flow

**Backend**
* Node.js
* Koa
* Flow

## Setting Up
If you want to get the entire project running (both the client and the API server), you can do the following:

1. Clone this repo
2. In the root folder, run the following:

```bash
npm run build # This installs both client and server dependencies
npm start # This will start the client server on localhost:3000 and the API server on localhost:3001
```

3. Head over to [localhost:3000](http://localhost:3000) to open the app.

**Note**: You will need to have LaTeX installed on your machine if you wish to test out the resume generation. You can download it [here](https://www.latex-project.org/get/).

---

There are a few other convenience commands that you can run from within the root project folder that will run commands on the client and server simultaneously:

```bash
npm test # Run all client and server tests
npm run lint # Uses blyss to lint client and server code
npm run fix # Tries to automatically fix client and server linting errors
npm run format # Uses prettier to format client and server code
```

## Contributing Client Changes
The client side is a React/Redux app with `styled-components` used for styling. It uses [`redux-form`](https://github.com/erikras/redux-form/) to manage form state, and [`react-pdf`](https://github.com/wojtekmaj/react-pdf) to display a PDF preview.

### Setup
To begin working on the clientside app, navigate to `resumake/app/client` in your terminal. If you haven't followed the steps listed in the **Setting Up** section, you will need to run:

```bash
npm install
```

If you already have the client dependencies installed, you can just run the following:

```bash
npm start
```

You can then head over to [localhost:3000](http://localhost:3000) to open the app.

To see what other `npm` commands you can run, checkout the [client readme](./app/client/readme.md).

---

The project structure uses a feature-based approach rather than the typical react/redux project structure. It looks something like this:

```
src/
├── app
├── common
├── features
│   ├── form
│   ├── preview
│   └── progress
├── index.html
└── index.js
```

The `app` folder contains the main stuff – the `App.js` component, the different `pages`, the root reducer, the store, etc.

The `common` folder contains things used throughout the project like common components (`Button`, `Input`, etc) as well as shared types and theme information. Colors, sizes, and animations used globally are all stored in `common/theme.js`.

The `features` folder is where the logic of the app is split up, and each `feature` will generally have the same structure. For example, here is the `preview` folder:

``` bash
src/features/preview/
├── actions.js
├── assets
├── components
├── reducer.js
├── tests
└── types.js
```

If you are familiar with React and Redux, most of this stuff (`reducer`, `actions`, `components`, `tests`) should look familiar to you. The `assets` folder will usually just static files like images, that are used for that specific feature. The `types` will be a file that contains some Flow type definitions that is used throughout that feature for actions, state, etc.

### Form
This feature is pretty self explanatory – it is the form stuff on the lefthand side of the app. It handles all form state as well as adding/removing additional fields. It also handles generating a resume on form submission which is what the Preview feature listens for.

### Preview
This feature is also pretty obvious – it is the preview window on the righthand side of the app. It takes the current resume stored in state and displays it using `react-pdf`.

### Progress
This feature manages both the progress bar at the bottom as well as the section ordering of the sidenav.

## Contributing Server Changes
The server side uses Node.js with Koa as the web framework of choice.

### Setup
To begin working on the serverside app, navigate to `resumake/app/server` in your terminal. If you haven't followed the steps listed in the **Setting Up** section, you will need to run:

```bash
npm install
```

If you already have the client dependencies installed, you can just run the following:

```bash
npm start
```

To see what other `npm` commands you can run, checkout the [server readme](./app/server/readme.md).

---

Here is the folder structure:

```bash
src/
├── generator
├── index.js
├── middleware
├── routes
└── types.js
```

`index.js` is the main entry point of the app. It creates a new Koa instance and uses our middleware and routes.

---

The `routes` folder is self-explanatory. Note that the project is setup so that all HTTP requests that start with `/api/` will automatically be proxied from the client to `routes/api.js`.

### routes/api.js
This file contains all the main API routes used in the app.

### routes/root.js
This file is a "catch-all" handler which lets the client handle all other routes (only needed in production).

### routes/index.js
This file combines the above two routers into a single `use`able middleware.

---

The `middleware` folder contains 3 things – `errorHandler`, `sanitizer`, and `jsonResume`.

### middleware/error-handler.js
The `errorHandler` is just our top-level convenience middleware that catches all errors downstream.

### middleware/sanitizer.js
The `sanitizer` is used to sanitize the request body received from the client that has all the form data. Also, it removes null/undefined/empty values and sanitizes LaTeX symbols.

### middleware/json-resume.js
The `jsonResume` middleware handles the case when the user imports a JSON file. It attempts to parse the JSON and send it back to the client where it is then used to send a followup HTTP request for PDF generation.

---

The `generator` folder is where most of the magic happens.

### generator/index.js
This file contains most of the important functions like `generatePDF` and `generateSourceCode`. Both of these functions first use `generator/templates/index.js` to generate the LaTeX document.
Afterwards, `generatePDF` will run a `latex` child process on the LaTeX document to generate a PDF and then return that, while `generateSourceCode` will simply prettify the document and send it straight to the user.

### generator/templates/index.js
This file is used to generate a LaTeX document, as well as any additional options needed (which LaTeX command to run, inputs/fonts to include, etc). It does this by checking which template number the user chose, and then deciding based on that.

---

## Submitting Issues
There is currently no issue format/template you need to follow, you can just raise your concern normally in the GitHub issues section.
