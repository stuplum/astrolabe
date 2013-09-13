function create(content, funcs) {
    var Klass = this.extend(content, funcs);
    return new Klass();
}

function extend(content) {

    var _super = this;

    function Fn(context) {
        _super.call(this, context);
        console.log('SubClass called');

//        Object.getPrototypeOf(this).constructor.call(this, arguments);
    }
    Fn.extend = extend;
    Fn.create = create;
    Fn.prototype = Object.create(_super.prototype, content);
    Fn.prototype.constructor = Fn;

    return Fn;
}

function Base() {
    console.log('Base called');
}

Base.create = create;
Base.extend = extend;

Base.prototype = Object.create({}, {
    by: { writable: false, value: protractor.By },
    driver: { configurable: false, get: function() { return protractor.getInstance(); } },
    findElement: { writable: false, value: function(by) { return this.context.findElement(by); } },
    findElements: { writable: false, value: function(by) { return this.context.findElements(by); } }
});

module.exports = Base;