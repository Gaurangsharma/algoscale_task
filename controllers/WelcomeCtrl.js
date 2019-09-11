var sessionUtils = require('../utils/sessionUtils');
var util=require('util');
var databaseUtils = require('../utils/databaseUtils');

module.exports = {
    showHomePage: function* (next) {
        yield this.render('login',{

        });
    },
    showSignup:function* (next) {
        yield this.render('signup',{

        });
    },

    login: function* (next){
      console.log(this);
        var username=this.request.body.username;
        var password=this.request.body.password;
        console.log(username,password);
        var user=yield databaseUtils.executeQuery(util.format("select * from user where username='%s' and password='%s'",username,password));
        console.log(user);
        if (user.length!=0){
            sessionUtils.saveUserInSession(user[0],this.cookies); 
            console.log("inner login sucessfull");
            user=user[0];
            console.log(user);
            yield this.render('index',{
                user:user
            });
        }
        else{
            var msg='Wrong Email or Password';
            yield this.render('page',{
                msg:msg,
            });
        }
    },
    delete: function* (next){
        console.log("delete m aya"); 
        console.log(this);  
          var username=this.request.body.username; 
          console.log(username);
          try{
          var user=yield databaseUtils.executeQuery(util.format("delete from user where username='%s'",username));
            console.log("UserDeleted");
            yield this.render('index',{
                user:user
            });
          }
          catch(e){
          console.log(e); 
              var msg='somthing wrong';
              yield this.render('page',{
                  msg:msg,
              });
          }
      },
    signup: function* (next){
        console.log(this);
        var username=this.request.body.username;
        var password=this.request.body.password;
        var phone_no=this.request.body.phone_no;
        console.log(username,password,phone_no);
        try{
        var user=yield databaseUtils.executeQuery(util.format("insert into user(username,password,phone_no) values('%s','%s','%s')",username,password,phone_no));
        console.log("Signup sucessfull");
            user=user[0];
        sessionUtils.saveUserInSession(user[0],this.cookies);
        yield this.render('index',{
            user:user
        });
        }
        catch(e){
            console.log("Error");
            var msg="Error";
        }

    }, 

    logout: function* (next) {
        var sessionId = this.cookies.get("SESSION_ID");
        if(sessionId) {
            sessionUtils.deleteSession(sessionId);
        }
        this.cookies.set("SESSION_ID", '', {expires: new Date(1), path: '/'});

        this.redirect('/app/home');
    }
}
