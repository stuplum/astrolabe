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
    find: {
        get: function() {
            var base = this,
                obj = {},
                css = function (selector) { return base.findBy(base.by.css, selector); },
                cssAll = function (selector) { return base.findAllBy(base.by.css, selector); },
                select = function (selector) { return base.findBy(base.by.select, selector); },
                binding = function (selector) { return base.findBy(base.by.binding, selector); },
                model = function (selector) { return base.findBy(base.by.model, selector); },
                input = function(selector) { return base.findBy(base.by.input, selector); },
                buttonText = function(selector) { return base.findBy(base.by.buttonText, selector); },
                textarea = function(selector) { return base.findBy(base.by.textarea, selector); };

            obj.all = { by: { css: cssAll } };
            obj.by = { css: css, select: select, binding: binding, model: model, input: input,
                buttonText: buttonText, textarea: textarea };

            return obj;
        }

    }
});

exports = module.exports = Base;