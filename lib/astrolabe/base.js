function Base() {}

Base.extend = function(content, funcs) {

    var _super = this;

    function Fn(context) { _super.call(this, context); }
    Fn.prototype = Object.create(_super.prototype, content);
    Fn.prototype.constructor = Fn;

    for (func in funcs) {
        if (funcs.hasOwnProperty(func)) {
            Fn.prototype[func] = funcs[func];
        }
    }

    return Fn;
};
Base.create = function(content, funcs) {
    var Klass = this.extend(content, funcs);
    return new Klass();
};

Base.prototype = Object.create({}, {
    by: { writable: false, enumerable: false, value: protractor.By },
    driver: { configurable: false, get: function() { return protractor.getInstance(); } }
});
Base.prototype.findElement = function(by) {
    return this.context.findElement(by);
};
Base.prototype.findElements = function(by) {
    return this.context.findElements(by);
};

module.exports = Base;