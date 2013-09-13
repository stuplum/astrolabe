var Base       = require('./base'),
    Serializer = require('./utils/serializer'),
    URL        = require('./utils/url'),
    underscore = require('underscore');

function go() {

    var url = new URL(this.url);

    underscore.each(arguments, function(arg) {
        if(underscore.isString(arg)) { url.addPath(arg); }
        if(underscore.isObject(arg)) { url.addParams(arg); }
    });

    this.context.get(url.url);
}

function mockModule(name, script) {

    var serializer   = new Serializer(),
        mockName     = name + 'Mock',
        scriptString = serializer.serialize(script),
        moduleString = "angular.module('" + mockName + "', []).value('" + name + "', " + scriptString + ");";

    this.context.addMockModule(mockName, moduleString);
}

function clearMocks() {
    this.context.clearMockModules();
}

module.exports = Base.extend(function () {
        this.context = this.driver;
    },{
        title:      { get: function() { return this.context.getTitle(); } },
        currentUrl: { get: function() { return this.context.getCurrentUrl(); } },

        go: { value: go },
        mockModule: { value: mockModule },
        clearMocks: { value: clearMocks }
    });