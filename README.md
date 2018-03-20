# %%REPO_NAME%%
Boilerplate project for libraries written in TypeScript

[![node](https://img.shields.io/node/v/%%PACKAGE_NAME%%.svg) ![npm](https://img.shields.io/npm/v/%%PACKAGE_NAME%%.svg)](https://www.npmjs.com/package/%%PACKAGE_NAME%%)

[![Build Status](https://img.shields.io/circleci/project/github/%%GITHUB_USER%%/%%REPO_NAME%%.svg)](https://circleci.com/gh/%%GITHUB_USER%%/%%REPO_NAME%%)
[![Coverage Status](https://img.shields.io/coveralls/github/%%GITHUB_USER%%/%%REPO_NAME%%.svg)](https://coveralls.io/github/%%GITHUB_USER%%/%%REPO_NAME%%)

## Features
* TypeScript + TSLint
* component tests using `mocha` & `chai`, `sinon` (w/ `sinon-chai`)
* coverage tests using `nyc`
* CircleCI: continuous testing and releases on `npm` for GitHub tags

## Setup
1. clone or copy this repo
2. run `node INIT.js` in the root of this project
3. `npm install`
4. push to your own repo and set up your CircleCI project

## Usage
### Build:
```
npm run build
```
or
```
npm run watch
```

### Test:
```
npm test
```

### Release:
```
npm run release -- [<releaseType> [<postfix]] [--dry]
```
with `releaseType` being one of `"major", "premajor", "minor", "preminor", "patch", "prepatch", "prerelease"`. Or (alternatively)  
```
npm run release -- <version> [--dry]
```
The `--dry` option prints out what **would** be done instead of actually doing it.
