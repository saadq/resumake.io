![](http://i.imgur.com/AkxxoCE.png)

LaTeX Resume Generator is an easy to use tool for creating elegant LaTeX resumes without the need to write any TeX code yourself.

Simply choose a template, fill in as much (or as little) info as you want, and click <kbd>Preview</kbd> at any point to see your generated resume. You can change which template you're using on the fly and once you're satisfied with your result you can download the generated PDF or the source code.

## Developing
You will need to be using Node v7.6 or above because the source code has `async/await` usage. There was an issue with Node 8.0.0, but it was resolved in 8.1.0, so make sure to upgrade if you're still on Node 8.0.0.

### Install Dependencies for client and server
```
npm run build
```

### Starting the dev server and api server
```
npm start
```

### Running client/server tests
```
npm test
```

To work on the client or server individually, check out the respective readme's in `app/client` or `app/server`.

### Donating
If you liked the project and want to buy me a bottle of water (I don't drink tea or coffee), [donations](https://www.paypal.me/saadquadri) are much appreciated.

### License
MIT &copy; Saad Quadri
