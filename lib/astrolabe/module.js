var Base = require('./base');

function Module() { Base.call(this); }

Module.prototype = Object.create(Base.prototype, {});

module.exports = Module;