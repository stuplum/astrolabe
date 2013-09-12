describe('angularjs homepage', function() {

    var angularJsPage = require('./pages/angularJsPage');

    it('should greet using binding', function() {

        angularJsPage.go();

        angularJsPage.yourName.sendKeys("John Doe");

        expect(angularJsPage.greeting.getText()).toEqual('Hello John Doe!');
    });

    it('should list todos', function() {

        angularJsPage.go();

        expect(angularJsPage.todo.getText()).toEqual('build an angular app');
    });

    //Uncomment to see failures.

//    it('should greet using binding - this one fails', function() {
//
//        angularJsPage.go();
//
//        angularJsPage.yourName.sendKeys("John Doe");
//
//        angularJsPage.greeting.getText().then(function(text) {
//            expect(text).toEqual('Hello Jack');
//        });
//    });

});
