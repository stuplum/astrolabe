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
                obj = {};

            obj.id = function(selector) { return base.findBy(base.by.id, selector); };
            obj.css = function (selector) { return base.findBy(base.by.css, selector); };
            obj.xpath = function (selector) { return base.findBy(base.by.xpath, selector); };
            obj.name = function(selector) { return base.findBy(base.by.name, selector); };
            obj.tagName = function(selector) { return base.findBy(base.by.tagName, selector); };
            obj.className = function(selector) { return base.findBy(base.by.className, selector); };
            obj.linkText = function(selector) { return base.findBy(base.by.linkText, selector); };
            obj.partialLinkText = function(selector) { return base.findBy(base.by.partialLinkText, selector); };
            obj.js = function(selector) { return base.findBy(base.by.js, selector); };
            obj.binding = function (selector) { return base.findBy(base.by.binding, selector); };
            obj.select = function (selector) { return base.findBy(base.by.select, selector); };
            obj.selectedOption = function (selector) { return base.findBy(base.by.selectedOption, selector); };
            obj.input = function(selector) { return base.findBy(base.by.input, selector); };
            obj.model = function (selector) { return base.findBy(base.by.model, selector); };
            obj.textarea = function(selector) { return base.findBy(base.by.textarea, selector); };
            obj.repeater = function(selector) { return base.findBy(base.by.repeater, selector); };
            obj.buttonText = function(selector) { return base.findBy(base.by.buttonText, selector); };
            obj.partialButtonText = function(selector) { return base.findBy(base.by.partialButtonText, selector); };

            var css = function (selector) { return base.findAllBy(base.by.css, selector); };
            var all = { by: { css: css } };

            return { all: all, by: obj };
        }

    }
});

exports = module.exports = Base;