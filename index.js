require('rootpath')();

var config = require('config.json');

var dbConnection = require('squery-io.js');

console.log(config.databaseUrl);
dbConnection.setUpConnection(config.databaseUrl);
dbConnection.performQuery({
    name: "qUwOR"
});
