var Base       = require('./base'),
    Serializer = require('./utils/serializer'),
    URL        = require('./utils/url'),
    underscore = require('underscore');

function Page() {
    Base.call(this);
    this.context = this.browser;
}

Page.prototype = Object.create(Base.prototype, {
    title:      { configurable: false, get: function() { return this.browser.getTitle(); } },
    currentUrl: { configurable: false, get: function() { return this.browser.getCurrentUrl(); } }
});
Page.prototype.go = function() {

    var url = new URL(this.url);

    underscore.each(arguments, function(arg) {
        if(underscore.isString(arg)) { url.addPath(arg); }
        if(underscore.isObject(arg)) { url.addParams(arg); }
    });

    this.browser.get(url.url);
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