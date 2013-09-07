var ptor = require('protractor');

function Base() {}

Base.prototype = Object.create({}, {
    by: { writable: false, enumerable: false, value: ptor.By },
    browser: { configurable: false, get: function() { return ptor.getInstance(); } }
});

module.exports = Base;