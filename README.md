# Web-development retrospective

This bunch of examples was created to show how the method for buidling web-sites proggressed. There are six examples, from the most basic site to somewhat full web-app, so you can trace the changes with added technologies and introduced practices. Hope this helps with understanding of how modern web-apps are built and structured (on the basic level).

Everything is configured as workspaces, so you can build and run everything using workspace commands. Here is the table of all the commands, that most of the workspaces implement:

|  Command   | Usage                                             | Description                                                                                                                                                                                                                                                      |
| :--------: | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **clean**  | `yarn clean` <br />`yarn workspace [name] clean`  | Removes all build artefacts and recreates the `dist` folder for the workspace.                                                                                                                                                                                   |
|  **lint**  | `yarn lint` <br />`yarn workspace [name] lint`    | Performs linting for main source files using `eslint` and fixes any issues if such are found. <br />Usually called together with the `build` command.                                                                                                            |
| **format** | `yarn format`<br />`yarn workspace [name] format` | Uses `prettier` to reformat the code base of the project to the typical code standards. <br />Don't confise with `.editorconfig` which is read only by the code editor. Usually called together with the `build` command.                                      |
| **build**  | `yarn build` `yarn workspace [name] build`        | Compiles/transforms/moves all necessary files to the `dist` directory using project's configured building tools.<br />Usually calls `wenbpack` under the hood and depends on `clean`,  `lint `and `format` commands.                                             |
| **serve**  | `yarn serve`<br />`yarn workspace [name] serve`   | Starts up a test server for the given workspace.<br />Can be plain `http-server`, `webpack-dev-server` or `express` server.<br />Usually you will get a url in the output on the `localhost` that you can follow to see the rendered application in the browser. |

## Structure of the project

- package.json – contains `build-all` and `clean-all` scripts that manage all packages in workspace.
- **0-basic/** – the most simplistic web-site example that consists only of `index.html`, `index.js` and `styles.css` files. Uses DOM to manipulate the HTML markup structure and display downloaded image. That's it.
  - src/ – all the source files for the project.
  - package.json – contatins definition for scripts `clear`, `build` and `serve`. Build here simply copies all the files from `src` to `dist`.
- **1-transpiler/** – adds support for the old browsers through the use of transpiler, babel in this case. You can read more about it here: [Babel Docs](https://babeljs.io/docs/ "Linl to babeljs.io")

  - src/ – all the source files for the project, `index.js` here is split into two files.
  - package.json – contatins definition for scripts `clear`, `build` and `serve`. Build calls `babel` to transpile all `js` files and copy others from `src`to `dist`.
  - babel.config.json – specifies `preset-env` for babel.
- **2-bundler/** – support multi-file/type projects by combining everything into one `js` file. Here we use `webpack` with some loaders and plugins to compile everything into `index.html`, `main.bundle.js`, `main.bundle.css`. View more information here: [Webpack Docs](https://webpack.js.org/concepts/ "Lint to webpack.org")
  - src/ – all the source files for the project, `.js` files only.
  - styles/ – `.css` files with styling for html elements.
  - index.html – template for the rendered html file.
  - style.css – import file for other `.css` files.
  - package.json – contatins definition for scripts `clear`, `build` and `serve`. Build calls `webpack` to compile everything to `dist`.
  - babel.config.json – specifies `preset-env` for babel.
  - webpack.config.cjs – configures entry point for the bundle, loaders for `.js` and `.css`files, as well as `HTMLWebpcakPlugin`for templated `index.html`and `MiniCSSExtractPlugin`for separate `styles.bundle.css`.
- **3-typescript/** – modify the build to support Typescript instead of Javascript. Actuall OOP and static typing is always welcome, so if you need to recall what Typescript is, look here: [Typescript Docs](https://www.typescriptlang.org/docs/ "Lint to typescriptlang.org"). We also add support for linting and formatting in this version with [Eslint](https://eslint.org/docs/latest/ "Docs") ta [Prettier](https://prettier.io/docs/ "Docs").
  - configs/ – since there are a lot of configs, we separate them into this folder.
    - .prettierc – config for prettier, basically nothing there.
    - babel.confing.json – the same as earlier.
    - eslint.config.mjs – typical Typescript Eslint configuration.
    - tsconfig.json – generic configs for Typescript compiler that targets `ESNext`.
    - webpack.config.cjs – we added `ts-loader` and support for the `.ts` files here.
  - src/ – all the source files for the project.
    - styles/ – `.css` moved here for simplicity of linting.
  - index.html – template for the rendered html file.
  - package.json – defines `clear`, `lint`, `format`, `build` and `serve`. Build calls `webpack` compile everytrhin to `dist` and Serve starts webpack's own dev-server.
- **4-react/** – finally stop using DOM directly and introduce React library to render UI in the SPA style. To do that we need to add support for JSX into Typescript and Babel. For more information about React you can read the docs as always: [React Docs](https://react.dev/learn "Link to react.dev")
  - configs/ – the same as previous.
    - .prettierc – the same as previous.
    - babel.confing.json – added `preset-react` to support transpilation of JSX.
    - eslint.config.mjs – the same as previous.
    - tsconfig.json – added support for JSX.
    - webpack.config.cjs – updated resolving for `.tsx` files.
  - src/ – all the source files for the project.
    - styles/ – `.css` files here.
  - index.html – template for the rendered html file.
  - package.json – defines `clear`, `lint`, `format`, `build` and `serve`.
- **5-app/** – to make this web-site into a self-sustaining app we need to add backend part and for that we'll need [Express](https://expressjs.com/en/starter/installing.html "Link to expressjs.com"). For this example there will be two apps `client` and `server` configured as separate packages but run from the workspace. For more info about the client-serve architecture in general check out this article: [MDN Client-Server](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview "Link to developer.mozilla.org")
  - package.json – defines `clean`, `build` and `serve` targets for the entire app.
  - client/ – front-end React application that was generated with Vite. Structure mostly the same as previous, just simplified.
    - src/ – all of the source files.
    - package.json – defines default Vite build scripts.
    - vite.configs.js – default Vite config file.
  - server/ – back-end Express application that serves the front-end to the user as static files and has an endpoint for retrieving the image.
    - configs/ – all of the configs are here as before with the difference in Webpack configs, which now target Node.
    - assets/ – static files that get loaded using back-end go here. This folder gets copied directly into `dist`.
    - src/ – all of the source files as `.ts`.
    - package.json – defines `clean`, `lint`, `format`, `build` and `serve` targets, where `build` runs Webpack to render the server files and `serve` run them on Node.
