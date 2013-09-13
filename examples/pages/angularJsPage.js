var Page = require('../../lib/astrolabe').Page;

var content = {

    url: { value: 'http://www.angularjs.org' },

    yourName: { get: function() { return this.findElement(this.by.input("yourName")) } },
    greeting: { get: function() { return this.findElement(this.by.binding("{{yourName}}!")); } },
    todo:     { get: function() { return this.findElement(this.by.repeater('todo in todos').row(2)); } }
};

function AngularJsPage() { Page.call(this); }
AngularJsPage.prototype = Object.create(Page.prototype, content);
AngularJsPage.prototype.constructor = AngularJsPage;

module.exports = new AngularJsPage();
