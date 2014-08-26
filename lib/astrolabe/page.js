var Base       = require('./base'),
    Serializer = require('./utils/serializer'),
    URL        = require('./utils/url'),
    underscore = require('underscore');

var go = function() {

    var url = new URL(this.url);

    underscore.each(arguments, function(arg) {
        if(underscore.isString(arg)) { url.addPath(arg); }
        if(underscore.isObject(arg)) { url.addParams(arg); }
    });

    this.context.get(url.url);
};

var mockBackend = function(script) {

    var serializer   = new Serializer(),
        scriptString = serializer.serialize(script),
        moduleString = "angular.module('httpBackendMock', ['ngMockE2E']).run(" + scriptString + ");";

    this.context.addMockModule('httpBackendMock', moduleString);
};

var mockModule = function(name, script) {

    var serializer   = new Serializer(),
        mockName     = name + 'Mock',
        scriptString = serializer.serialize(script),
        moduleString = "angular.module('" + mockName + "', []).value('" + name + "', " + scriptString + ");";

    this.context.addMockModule(mockName, moduleString);
};

var clearMocks = function() {
    this.context.clearMockModules();
};

exports = module.exports = Base.extend(function () { this.context = this.driver; }, {

    debug: { value: function() { this.context.debugger(); } },

    title:      { get: function() { return this.context.getTitle(); } },
    currentUrl: { get: function() { return this.context.getCurrentUrl(); } },
    baseUrl:    { get: function() { return this.context.baseUrl; } },

    go: { value: go },

    mockBackend: { value: mockBackend },
    mockModule: { value: mockModule },
    clearMocks: { value: clearMocks }
});