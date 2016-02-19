require('rootpath')();
var mongoose = require('mongoose');

var moduleServices = {};
moduleServices.setUpConnection = setUpConnection;
moduleServices.performQuery = performQuery;
module.exports = moduleServices;

var dbConn;
var schema_one = mongoose.Schema({
    name: String,
    employeeId: Number,
    experience: Number,
    confirmed: Boolean
});


var model_one = mongoose.model('collection_one', schema_one);

function setUpConnection(mongoUrl) {
    mongoose.connect('mongodb://' + mongoUrl);
    dbConn = mongoose.connection;
    dbConn.on('error', console.error.bind(console, 'connection error:'));
    dbConn.once('open', function () {
        console.log("Connection set up!");
    });
}

function generateDummyData() {
    for (var i = 0; i < 100; i++) {
        obj1 = new model_one({
            name: generateRandomName(),
            employeeId: i,
            experience: i,
            confirmed: getRandomBool(i)
        });
        obj1.save(function (err, doc) {
            if (err) return console.log(err);
            console.log(doc.name);
        });
    }
}

function performQuery(query) {
    model_one.find(query, function (err, doc) {
        if (err) return console.error(err);
        console.log(doc);
    });
}

function generateRandomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

function getRandomBool(i) {
    if (i % 2 == 0) {
        return true;
    } else {
        return false;
    }
}
