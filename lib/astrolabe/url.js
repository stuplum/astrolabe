function URL(base) {
    this.base   = base;
    this.paths  = [];
    this.params = {};
}

URL.prototype = Object.create({}, {
    url:   { get: function() { return this.base + this.path + this.query; } },
    path:  { get: function() { return this.paths.length ? '/' + this.paths.join('/') : ''; }},
    query: {
        get: function() {
            var params = underscore.map(this.params, function(param, key){ return key + '=' + param; });
            return params.length ? '?' + params.join('&') : '';
        }
    }
});
URL.prototype.addPath = function(path) {
    this.paths.push(path);
};
URL.prototype.addParams = function(params) {
    underscore.extend(this.params, params);
};

module.exports = URL;