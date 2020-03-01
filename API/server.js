// https://whispering-headland-79777.herokuapp.com/

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
 
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-    With,content-type,Accept,content-type,application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var db;
var transactions;
var accounts;
var users;
 
const MongoClient = require('mongodb').MongoClient;
 
const uri = "mongodb+srv://jani:jani@cluster-tmss0.mongodb.net/Transactions?retryWrites=true&w=majority";
 
// Connect to database
MongoClient.connect(uri, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected...');
  transactions = client.db("BankApp").collection("Transactions");
  accounts = client.db("BankApp").collection("Accounts");
  users = client.db("BankApp").collection("Users");
 
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
 
// Handle errors
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// Authentication
app.post("/api/users", function(req, res) {
  if (!(req.body.username) && !(req.body.password)) {
    handleError(res, "Invalid user input", "Must provide username and password.", 400);
  }
  users.findOne({ username: req.body.username, password: req.body.password }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);  
    }
  });
});
 
// Get transactions which apply to this account
app.get("/api/transactions/:accountNumber", function(req, res) {
  transactions.find( { $or: [ { to: req.params.accountNumber }, { from: req.params.accountNumber } ] } ).toArray(function(err, docs) {
  if (err) {
      handleError(res, err.message, "Failed to get transactions.");
    } else {
      res.status(200).json(docs);  
    }
  });
});

// Get user accounts
app.get("/api/accounts/:userId", function(req, res) {
  accounts.find({ userId: req.params.userId }).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get accounts.");
    } else {
      res.status(200).json(docs);  
    }
  });
});
 
// Post new transaction and update accoun balance
app.post("/api/transactions", function(req, res) {
  var newTransaction = req.body;
  newTransaction.createDate = new Date();
 
  if (!(req.body.to)) {
    handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
  }
 
  transactions.insertOne(newTransaction, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new transaction.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });

  accounts.update({ accountNumber: req.body.to }, { $inc: { "accountBalance": +req.body.amount }});
  accounts.update({ accountNumber: req.body.from }, { $inc: { "accountBalance": -req.body.amount }});
});