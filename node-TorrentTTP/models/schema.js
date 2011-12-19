(function () {

    "use strict";

    var root = this;
    
    (function () {
    
        var schema = this,
            mongoose = require('mongoose');
        
        schema.File = new mongoose.Schema({
        
            "UUID": String,
            "Name": String,
            "Source_Path": String,
            "System_Path": String,
            "Size": Number
        
        });
        
        schema.Share = new mongoose.Schema({
        
            "UUID": String,
            "Groups": [String],
            "Files": [String]
        
        });
        
        schema.User = new mongoose.Schema({
        
            "UUID": String,
            "Auth": String
        
        });
        
        schema.Group = new mongoose.Schema({
        
            "UUID": String,
            "Users": [String]
        
        });
        
        schema.Session = new mongoose.Schema({
        
            "UUID": String,
            "IP": String,
            "User": String
        
        });
        schema.TrustBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
        schema.UserBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
        schema.GroupBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
        schema.FileBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
        schema.ShareBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
        schema.SessionBroker = new mongoose.Schema({
        
            "UUID": String,
            "IP": String
        
        });
    
    }.call(root.exports));

}.call(module));