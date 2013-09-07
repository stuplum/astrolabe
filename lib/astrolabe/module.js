var Base = require('./base');

function Module() { Base.call(this); }

Module.prototype = Object.create(Base.prototype, {});
Module.prototype.findElement = function(by) {
    return this.browser.findElement(by);
};
Module.prototype.findElements = function(by) {
    return this.browser.findElements(by);
};

module.exports = Module;