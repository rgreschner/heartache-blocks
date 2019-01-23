# Heartache Blocks - A Heartache Box for Blockchain

<p align="center"><img src="/doc/img/screen-submitter-ui.png?raw=true"/></p>

Heartache Blocks is a small DApp and CMS (Complaint Management System).

Using Ethereum, IPFS and some asymmetric encprytion magic it allows anyone to run their own decentralized heartache box in the cloud where anyone else can send their complaints to.

## Getting Started

Instructions for getting up and running ;)

### Prerequisites

To build and run these project the following prerequisites must be met:

* Node.js in at least v8.10.0
* Globally installed Typescript compiler in at least v3.1.6.
* Basic familiarity with Node.js & NPM, React and Truffle is helpful.
* Truffle suite for test deployments of Ethereum contract, used version is Truffle v5.0.2.
* OpenZeppelin smart contract library, used version is 2.1.2.
* Browser supporting MetaMask, primarily tested with Chrome, see [MetaMask Homepage](https://metamask.io).

### Package Overview

The whole project is self-contained in this monorepo using Lerna.

It consists of the following packages:

* **contracts**: this contains the smart contracts of the project.
* **submitter-ui**: this is the actual DApp written in React.

**TODO:** Management UI for receiving end. Will do this sometime else, probably in Angular then.

### Build Instructions

#### Submitter UI

In order to build the Submitter UI, navigate into folder `packages/submitter-ui`.
Install NPM dependencies by invoking `npm i`.

After all dependencies are met, you may run the `submitter-ui` project by invoking `npm start` to serve it locally using React Webpack Dev Server or build it for static web server deployment by using `npm run build`.

Local dev server will start on port 3000 and open the DApp inside a new browser tab.

**Note:** I ran into an issue with heap memory when trying to build on Node.js v10. Build on v8 works though.

#### Ethereum Smart Contract

**Note for Windows users: depending on path and environment it might be necessary to invoke Truffle suite by using `truffle.cmd` in CLI instead!**

Make sure Truffle suite is installed in version 5.
You can do so by typing `truffle version` on commandline.
The version of Truffle should be equal to **Truffle v5.0.2 (core: 5.0.2)**.

If this is not the case or Truffle suite is not installed at all, you can install it by typing `npm i -g truffle`.

Additionally you need to install additional libraries like the OpenZeppelin smart contract library.
To do so, invoke `npm i` in directory `packages/contracts`.

In order to compile the HeartacheBox contract, navigate into the folder `packages/contracts` and invoke `truffle build`.
This compiles the smart contracts and outputs them into the sub-directory `build/contracts`.

Afterwards you need to build TypeScript contract type definitions by using `npm run build-typings`, this will also (contrary to NPM script name) copy the compiled contract into the DApp.

### Usage Information

#### Starting a Test Network

In order to test the Dapp and contracts locally it is required to start a Truffle Develop beforehand.

To do so, navigate into the folder `packages/contracts` where `truffle-config.js` is located and invoke `truffle develop` in CLI.

#### Running Contract Unit Tests

The unit tests for the smart contract are written in Typescript and compiled before test run using a NPM script.

In order to run the contract unit tests, navigate into the folder `packages/contracts` and invoke `npm run test`.

This will compile the smart contracts and unit tests written in Typescript and invoke Truffle's built-in Mocha test runner.

#### Running and Using the DApp

To use the DApp, navigate into the folder `packages/submitter-ui` and invoke `npm start`.
This will open a new browser tab with the DApp for Complaint Submission.

The DApp opens with a dialog for contract selection.
Type the contract address into the input field, e.g. copy it from a contract unit test run and press `Apply`.

Make sure that you selected the previously started dev network in MetaMask beforehand!

After you input the contract address an input form for complaints will be displayed.
Write something into the text box below and press `Check your complaint`.
This will allow you to proof-read your complaint before submission.

Once you are done doing so, press `Submit`.
This will submit your encrypted complaint to IPFS and the smart contract.

## License

This project is licensed under the terms of the **MIT** license, see `LICENSE` to check out the full license.