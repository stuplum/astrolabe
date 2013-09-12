function create(content, funcs) {
    var Klass = this.extend(content, funcs);
    return new Klass();
}

function extend(content, funcs) {

    var _super = this;

    function Fn(context) { _super.call(this, context); }
    Fn.extend = extend;
    Fn.create = create;
    Fn.prototype = Object.create(_super.prototype, content);
    Fn.prototype.constructor = Fn;

    for (var func in funcs) {
        if (funcs.hasOwnProperty(func)) {
            Fn.prototype[func] = funcs[func];
        }
    }

    return Fn;
}

function Base() {}

Base.create = create;
Base.extend = extend;

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