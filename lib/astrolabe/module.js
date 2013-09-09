var Base = require('./base');

function Module(context) {
    Base.call(this);
    this.context = context;
}

Module.prototype = Object.create(Base.prototype, {});

module.exports = Module;