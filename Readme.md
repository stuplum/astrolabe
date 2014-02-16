Astrolabe [![Build Status](https://travis-ci.org/stuplum/astrolabe.png?branch=master)](https://travis-ci.org/stuplum/astrolabe)
=========

`Astrolabe` is an extension for [protractor](https://github.com/juliemr/protractor) that adds page objects to your functional/e2e tests.

Installation
------------

via [npm (node package manager)](http://github.com/isaacs/npm)

    $ npm install astrolabe


Usage
-----

Example signInPage.js

``` js
var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://mysite.com/signin' },

    username: { get: function() { return this.findElement(this.by.input('username')); } }, // finds an input element with the name 'username'
    submit:   { get: function() { return this.findElement(this.by.id('submit')); } }       // finds an element with the id 'submit'
});
```

adding to tests:

``` js
var signInPage = require('./path/to/signInPage');

...
```

navigating:

``` js
signInPage.go(); // will send browser to 'http://mysite.com/signin'

signInPage.go('some', 'path'); // will send browser to 'http://mysite.com/signin/some/path'
signInPage.go('some/path');    // will send browser to 'http://mysite.com/signin/some/path'

signInPage.go({ some: 'query' }); // will send browser to 'http://mysite.com/signin?some=query'
```

interacting: (See [Protractor API Docs](https://github.com/angular/protractor/blob/master/docs/api.md) for more info on available api methods)

``` js
signInPage.username.sendKeys('a username'); // will fill the username input with the text 'a username'

signInPage.submit.click(); // will click on the submit element
```

``` js
signInPage.username.getAttribute('value'); // will return a promise that is resolved with the value of the text field, in this case 'a username'

// this can be used within an expectation
expect(signInPage.username.getAttribute('value')).toBe('a username');
```

It is possible to create convenience methods to wrap up common logic.

Example signInPage.js

``` js
var Page = require('astrolabe').Page;

module.exports = Page.create({

    url: { value: 'http://mysite.com/signin' },

    username: { get: function() { return this.findElement(this.by.input('username')); } },
    password: { get: function() { return this.findElement(this.by.input('password')); } },
    submit:   { get: function() { return this.findElement(this.by.id('submit')); } },
    invalid:  { get: function() { return this.findElement(this.by.id('incorrectLogin')); } },

    InvalidLoginException: { get: function() { return this.exception('Invalid Login'); } },

    // Adds a signIn method to the page object.
    signIn:   { value: function(username, password) {

        var page = this;

        page.go();

        page.username.sendKeys(username);
        page.password.sendKeys(password);

        page.submit.click();

        return this.invalid.isDisplayed().then(function (wrongLogin) {
            if (wrongLogin) {
                page.InvalidLoginException.thro(username + ', ' + password + ' is not valid');
            }
        });
    } }
});
```

can be used in your tests:

``` js
var signInPage = require('./path/to/signInPage');

...

signInPage.signIn('test user', 'testpassword'); // will navigate to sign in page, enter username and password then click submit.

...
```

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
