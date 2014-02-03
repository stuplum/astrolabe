if ( typeof protractor === 'undefined' ) {
    protractor = require('protractor');
}

function typeOf(name, obj) {
    return Object.prototype.toString.call(obj) === '[object ' + name + ']';
}

var create = function() {
    var Klass = this.extend.apply(this, arguments);
    return new Klass();
};

var extend = function() {

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
};

var Base = function() {};

Base.create = create;
Base.extend = extend;

Base.prototype = Object.create({}, {
    by:           { value: protractor.By },
    driver:       { get: function() { return protractor.getInstance(); } },
    findElement:  { value: function(by) { return this.context.findElement(by); } },
    findElements: { value: function(by) { return this.context.findElements(by); } },
    findBy: { value: function(byType, selector) { return this.findElement(byType(selector)); } },
    findAllBy: { value: function(byType, selector) { return this.findElements(byType(selector)); } },
    findByCss : { value: function(selector) { return this.findBy(this.by.css, selector); } },
    findAllByCss: { value: function(selector) { return this.findAllBy(this.by.css, selector); } },
    findSelect: { value: function(selector) { return this.findBy(this.by.select, selector); } },
    findInput: { value: function(selector) { return this.findBy(this.by.input, selector); } },
    findByBinding: { value: function(selector) { return this.findBy(this.by.binding, selector); } },
    findByModel: { value: function(selector) { return this.findBy(this.by.model, selector); } },
    findButtonByText: { value: function(selector) { return this.findBy(this.by.buttonText, selector); } },
    findTextArea: { value: function(selector) { return this.findBy(this.by.textarea, selector); } }
});

exports = module.exports = Base;