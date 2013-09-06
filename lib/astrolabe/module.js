var ptor = require('protractor');

function Module() {}

Module.prototype = Object.create({}, {
    by: { writable: false, enumerable: false, value: ptor.By },
    browser: { configurable: false, get: function() { return ptor.getInstance(); } }
});
Module.prototype.findElement = function(by) {
    return this.browser.findElement(by);
};
Module.prototype.findElements = function(by) {
    return this.browser.findElements(by);
};

module.exports = Module;