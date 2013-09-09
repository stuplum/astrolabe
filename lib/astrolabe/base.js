function Base() {}

Base.prototype = Object.create({}, {
    by: { writable: false, enumerable: false, value: protractor.By },
    browser: { configurable: false, get: function() { return protractor.getInstance(); } }
});
Base.prototype.findElement = function(by) {
    return this.context.findElement(by);
};
Base.prototype.findElements = function(by) {
    return this.context.findElements(by);
};

module.exports = Base;