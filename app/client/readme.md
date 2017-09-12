# saadq-boilerplate
A boilerplate with my preferences for creating a client-side app with React. This boilerplate is quite opinionated and is mainly for personal use.

If you're looking for something more general to get started with Flowtype and React/Redux, check out [flow-boilerplate](https://github.com/saadq/flow-boilerplate).

This boilerplate contains:

* Webpack 3 (Dev/Prod configs) w/ Hot Reloading
* React
* Styled Components
* Flowtype for types
* Jest and Enzyme for testing
* Blyss for JS linting
* Prettier for formatting

## Usage
Just clone the repo, and then run:

```shell
$ npm install
```

## Scripts
### npm start
Starts the dev server at `http://localhost:3000`.

### npm run build
Creates a production bundle for your app.

### npm run flow <cmd>
Run the `flow` binary.

### npm run flow-typed <cmd>
Runs the `flow-typed` binary.

### npm run lint
Lints code with `blyss`.

### npm run fix
Tries to fix as many lint errors as it can.

### npm run format
Uses `prettier` to format code.

### npm test
Tests code by running `flow` and `eslint` and then runs all `ava` tests.
