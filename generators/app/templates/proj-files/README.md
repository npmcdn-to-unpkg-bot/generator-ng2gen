## Intro

This repository is a seed Angular2 application, with a focus on showing how
unit tests can be written and run.

## Software Prerequisites

In order to run this seed, the following software is required

### Git

See [Setting Up Git](https://help.github.com/articles/set-up-git/) from the GitHub guides.

### Node.js and npm

Node.js and Node's package manager, npm, are used for installing dependencies,
running the build steps, and running tests.

## Getting Started

Begin by cloning the repository.

### Dependencies

Use npm to get dependencies:

`npm install`

Take a look at the `src` folder. All application and test code, as well as
some configuration files, are in here. The `app` folder contains the actual
application code, written in TypeScript, as well as associated template and
css files. The `test` folder contains unit tests.

### Proxy

Setup proxy to download custom typings from third party vendors:

`configure .typingsrc`

Open .typingsrc and:

replace <username> with your username
replace <password> with your password

After updating this file right-click on the project and select Git -> Commit Directory.

Right-click on the .typingsrc file in the popup and select the menu option Move to another changelist...

In the new changelist name type typingsrc and press ok.

This will remove the file from being checked in with your default changelist.


### Serve

To see the app, run

click the start server green arrow icon in IDE in top right corner or

type `npm run lite`

and navigate to `localhost:9090/src/index.html`.

### Build and Test

Karma is used with the Jasmine test framework to run unit tests.

run the `default` gulp task or the `build-dev` task to run the project in development mode.

The configuration for the gulp TypeScript compiler is in `tsconfig.json`.

Will clean the build/ and dist/ folders.

Will compile all the `.ts` files in the src folder and create a distributable bundled
package in the dist/ folder.

Will compile all the `.ts` files in the src folder and create a build folder containing the unbundled
ES5 files used for testing in the build/ folder.

Will watch for any code changes in the src/app folder and rebundle the dist/ folder and recompile to the build/ folder.

Will start a persistent process which will re-run tests whenever the .js compiled files are changed in the build/ folder.

You can see the Karma configuration at `karma.conf.js`. A few things are notable:

 - It grabs Angular by including the `angular2` and `testing.js` files from
 `node_modules/angular2/bundles/`.

 - The compiled JavaScript files at `src/**/*.js` are served and watched but _not_ included.
 This means that Karma will not run them automatically.

 - To get file imports to work correctly in Karma, we must include `systemjs`
 from the node_modules folder, as well as the helper file `karma-test-shim.js`.
 This shim file uses System.js to load the JavaScript files which Karma served
 but did not automatically run.
 