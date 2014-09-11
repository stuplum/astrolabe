var angularJsPage = require('./pages/angularJsPage');

describe('angularjs homepage', function() {

    beforeEach(function() {
        angularJsPage.go();
    });

    it('should greet using binding', function() {

        angularJsPage.yourName.sendKeys("John Doe");

        expect(angularJsPage.greeting.getText()).toEqual('Hello John Doe!');
    });

    it('should list todos', function() {

        expect(angularJsPage.todo.getText()).toEqual('build an angular app');
    });


    it('should greet using binding', function() {

        angularJsPage.yourName.sendKeys("John Doe");

        angularJsPage.greeting.getText().then(function(text) {
            expect(text).toEqual('Hello John Doe!');
        });
    });

});

