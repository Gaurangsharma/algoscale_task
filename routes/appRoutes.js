var Router= require('koa-router');
var bodyParser = require('koa-body')();

module.exports = function(app){

    var router = new Router();

    //Welcome Routes
    var welcomeCtrl = require('./../controllers/WelcomeCtrl');
    router.get('/home', welcomeCtrl.showHomePage);
    router.get('/signup', welcomeCtrl.showSignup);
    router.post('/login', welcomeCtrl.login);
    router.post('/delete', welcomeCtrl.delete);
    router.post('/signup', welcomeCtrl.signup);
    router.get('/Logout', welcomeCtrl.logout);

    return router.middleware();
}
