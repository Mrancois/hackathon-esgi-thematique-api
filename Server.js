var express      = require("express");
var mysql        = require("mysql");
var bodyParser   = require("body-parser");
var md5          = require('MD5');
var rest         = require("./REST.js");
var app          = express();

function REST(){
    var self = this;
    self.connectMysql();
};

REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({

        // LOCAL
        /*
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'esgi-hackathon',
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        debug    :  false
        */
        // GLOBAL
        host     : 'eu-cdbr-west-01.cleardb.com',
        user     : 'bbe68017d3e8d1',
        password : '23f9d7aa',
        database : 'heroku_7ac86b3c77abf49',
        // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
        debug    :  false

    });
    self.configureExpress(pool);
    /*
    pool.getConnection(function(err,connection){
        if(err) {
          console.log('err maggle');
          console.log(err);
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
        // connection.release();
    });
    */
}

REST.prototype.configureExpress = function(pool) {
      var self = this;
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      var router = express.Router();
      app.use('/api_esgi_hackathon', router);
      var rest_router = new rest(router,pool,md5);

      self.startServer();
}

REST.prototype.startServer = function() {
  var port = process.env.PORT;
  // var port = 3000;
  app.listen(port,function(){
      console.log("Welcome");
  });

}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL \n" + err);
    process.exit(1);
}

new REST();

module.exports = app;
