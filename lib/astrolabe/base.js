var exceptions = require('exceptions');

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
    driver:       { get: function() { return browser; } },
    exception:    { value: function(name) { return new exceptions.Exception(name); } },
    findElement:  { value: function(by) { return this.context.findElement(by); } },
    findElements: { value: function(by) { return this.context.findElements(by); } },
    find: {
        get: function() {
            var base = this;
            var selectorStrategies = [ 'id',
                                       'css',
                                       'xpath',
                                       'name',
                                       'tagName',
                                       'className',
                                       'linkText',
                                       'partialLinkText',
                                       'js',
                                       'binding',
                                       'select',
                                       'selectedOption',
                                       'input',
                                       'model',
                                       'textarea',
                                       'repeater',
                                       'buttonText',
                                       'partialButtonText',
                                       'cssContainingText'];

            var bys = {};
            var allBys = {};
            selectorStrategies.forEach(function (strategy) {
                var by = base.by[strategy];
                bys[strategy] = function (selector) { return base.findElement(by(selector)); };
                allBys[strategy] = function (selector) {
                    return base.findElements(by(selector));
                };
            });

            var all = { by: allBys };
            return { all: all, by: bys };
        }
    }

});

exports = module.exports = Base;
