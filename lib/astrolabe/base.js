function typeOf(name, obj) {
    return Object.prototype.toString.call(obj) === '[object ' + name + ']';
}

function create() {
    var Klass = this.extend.apply(this, arguments);
    return new Klass();
}

function extend() {

    var _super   = this,
        _noop    = function() {},
        _const   = typeOf('Function', arguments[0]) ? arguments[0] : _noop,
        _content = typeOf('Object',   arguments[0]) ? arguments[0] : arguments[1] || {};

    function Fn() {
        _super.apply(this, arguments);
        _const.apply(this, arguments);
    }

    Fn.extend = extend;
    Fn.create = create;

    Fn.prototype = Object.create(_super.prototype, _content);
    Fn.prototype.constructor = Fn;

    return Fn;
}

function Base() {}

Base.create = create;
Base.extend = extend;

Base.prototype = Object.create({}, {
    by:           { value: protractor.By },
    driver:       { get: function() { return protractor.getInstance(); } },
    findElement:  { value: function(by) { return this.context.findElement(by); } },
    findElements: { value: function(by) { return this.context.findElements(by); } }
});

module.exports = Base;