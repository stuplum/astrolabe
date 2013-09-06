var Module     = require('./module'),
    Serializer = require('./serializer'),
    URL        = require('./url'),
    underscore = require('underscore');

function Page() { Module.call(this); }

Page.prototype = Object.create(Module.prototype, {
    title:   { configurable: false, get: function() { return this.browser.getTitle(); } }
});
Page.prototype.go = function() {

    var url = new URL(this.url);

    underscore.each(arguments, function(arg) {
        if(underscore.isString(arg)) { url.addPath(arg); }
        if(underscore.isObject(arg)) { url.addParams(arg); }
    });

    this.browser.get(url.url);
};
Page.prototype.at = function() {
    return this._at.call();
};
Page.prototype.mockModule = function(name, script) {

    var serializer   = new Serializer(),
        mockName     = name + 'Mock',
        scriptString = serializer.serialize(script),
        moduleString = "angular.module('" + mockName + "', []).value('" + name + "', " + scriptString + ");";

    this.browser.addMockModule(mockName, moduleString);
};
Page.prototype.clearMocks = function() {
    this.browser.clearMockModules();
};

module.exports = Page;