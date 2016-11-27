---
title: CLI Commands
description: Perk CLI command descriptions and documentation.
date: 2016-02-15
layout: topic.html
---

## Table of Contents

1. [Overview](#overview)
1. [npm start](#npm-start)
1. [npm test](#npm-test)
1. [npm run dev](#npm-run-dev)
1. [npm run config](#npm-run-config)
1. [npm run build](#npm-run-build)
1. [npm run eslint](#npm-run-eslint)

## Overview

Perk has several CLI commands that you can invoke to help you during development. All of these commands are defined in the `package.json` file and the descriptions of these commands as well as options are outlined below.

## npm start

Starts the webserver. This command is similar to `npm run dev` except that it will not watch for file changes or do any transpilation of front-end assets. It simply boots up the server. You can choose which environment to use by prefixing the command with `NODE_ENV=${environment}`. For example:

* `npm start` starts the server in development mode.
* `NODE_ENV=production npm start` starts the server in production mode.
* `NODE_ENV=heroku npm start` starts the server as if it were running on heroku.
* etc.

## npm test

Runs the code linter defined by the `.eslintrc` and the unit tests defined in the `test` directory. Perk ships with serveral tests of built in logic (including for authentication and config logic). You may modify the `.eslintrc` file to reflect your own coding standards and/or add your own tests to the `test` directory.

To run tests in isolation you can run the built in `mocha` command. You can learn more about [mocha cli options here](https://mochajs.org/#usage).

## npm run dev

Starts the webserver in development mode and watches for changes to front-end asset files (JavaScript and Sass). This command is similar to `npm start` except that it will also watch for file changes and do transpilation of front-end assets.

This command will also check to see if there is an existing `config/local.js` file. If there isn't it will prompt you to fill in basic configuration information.

## npm run config

Opens up a command line interface for modifying your `config/local.js` file. You can also modify the file directly in your favorite editor.

## npm run build

Builds your front-end assets (JavaScript and Sass) for production, including minifying these files.

### options

* `--watch` - Use this flag to watch for front-end and backend file changes after build is complete.
* `--scripts` - Use this flag to transpile JavaScript files, including bundling as well as ES2015 and JSX transpilation.
* `--server` - Use this flag to start the webserver.
* `--styles` - Use this flag to process Sass files.
* `--minify` - Use this flag to minify Sass and font-end JavaScript assets.

## npm run eslint

Runs a linter on your code to check formatting and coding standards defined in the `.eslintrc` file.

