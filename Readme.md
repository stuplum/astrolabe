Astrolabe [![Build Status](https://travis-ci.org/stuplum/astrolabe.png?branch=master)](https://travis-ci.org/stuplum/astrolabe)
=========

`Astrolabe` is an extension for [protractor](https://github.com/juliemr/protractor) that adds page objects to your functional/e2e tests.

It is inspired by Geb from the groovy world.


Using Astrolabe
---------------




Cloning and running Astrolabe's tests
-------------------------------------
Clone the github repository.

    git clone https://github.com/stuplum/astrolabe.git
    cd astrolabe
    npm install

    npm test

Running Astrolabe's example protractor test
-------------------------------------------

Install protractor with.

    npm install protractor

Start up a selenium server (See the appendix below for help with this). By default, the tests expect the selenium server to be running at `http://localhost:4444/wd/hub`.

The example folder contains a simple test suite which runs against angularjs.org. It is a port of the simple test suite included with protractor.

Currently only the protractor runner is supported. The runner accepts a configuration file, which runs the tests at `example/onProtractorRunner.js`.

    node_modules/.bin/protractor examples/protractor.conf.js


Setting up a standalone selenium server
---------------------------------------

See Appendix A of [protractor's](https://github.com/juliemr/protractor) installation instructions