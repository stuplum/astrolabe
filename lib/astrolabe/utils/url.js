var _ = require('underscore');

var URL = function(base) {
    this.base   = base;
    this.paths  = [];
    this.params = {};
};
URL.prototype = Object.create({}, {
    url:   { get: function() { return this.base + this.path + this.query; } },
    path:  { get: function() { return this.paths.length ? '/' + this.paths.join('/') : ''; }},
    query: {
        get: function() {
            var params = _.map(this.params, function(param, key){ return key + '=' + param; });
            return params.length ? '?' + params.join('&') : '';
        }
    }
});
URL.prototype.addPath = function() {

    var self = this;

    _.each(arguments, function(arg) {
        var leadingSlashRegEx = /^\//;
        self.paths.push(arg.replace(leadingSlashRegEx,''));
    });

    return self;
};
URL.prototype.addParams = function(params) {
    _.extend(this.params, params);
    return this;
};

exports = module.exports = URL;