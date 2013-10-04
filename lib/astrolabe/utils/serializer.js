var _ = require('underscore');

var Serializer = function() {

    function serialize(serializable) {
        return _.isFunction(serializable) ? '' + serializable : serializeObject(serializable);
    }

    function serializeObject(serializable) {
        var propertyStrings = [];

        _.each(serializable, function(prop, key) {
            propertyStrings.push(getPropertyString(key, prop));
        });

        return '{' + propertyStrings.join(', ') + '}';
    }

    function getPropertyString(key, value) {

        var s = key + ': ';

        switch(getObjectType(value)) {
            case 'String':
                s += '"' + value + '"';
                break;
            case 'Number':
            case 'Boolean':
                s += value;
                break;
            case 'Date':
                s += value.toLocaleString();
                break;
            case 'Function':
                s += value;
                break;
            case 'Array':
                _.each(value, function(arrayValue) {
                    s += serialize(value[arrayValue]);
                });
                break;
            default:
                _.each(value, function(arrayValue) {
                    s += serialize(value[arrayValue]);
                });
                break;
        }

        return s;
    }

    function getObjectType(obj) {

        var type;

        if (_.isArguments(obj)) { type = "Arguments"; }
        if (_.isObject(obj))    { type = "Object"; }
        if (_.isFunction(obj))  { type = "Function"; }
        if (_.isArray(obj))     { type = "array"; }
        if (_.isString(obj))    { type = "String"; }
        if (_.isNumber(obj))    { type = "Number"; }
        if (_.isBoolean(obj))   { type = "Boolean"; }
        if (_.isNaN(obj))       { type = "NaN"; }
        if (_.isNull(obj))      { type = "Null"; }
        if (_.isUndefined(obj)) { type = "undefined"; }
        if (_.isDate(obj))      { type = "date"; }

        return type;
    }

    this.serialize = serialize;
};

exports = module.exports = Serializer;