(function () {

    "use strict";

    var root = this;
    
    (function () {
    
        var models = this,
            mongoose = require('mongoose'),
            schemas = require('./schema.js');
        
        models.File = mongoose.model('File',schemas.File);
        models.Share = mongoose.model('Share',schemas.Share);
        models.User = mongoose.model('User',schemas.User);
        models.Group = mongoose.model('Group',schemas.Group);
        models.Session = mongoose.model('Session',schemas.Session);
        
        models.TrustBroker = mongoose.model('TrustBroker',schemas.TrustBroker);
        models.FileBroker = mongoose.model('FileBroker',schemas.FileBroker);
        models.ShareBroker = mongoose.model('ShareBroker',schemas.ShareBroker);
        models.UserBroker = mongoose.model('UserBroker',schemas.UserBroker);
        models.GroupBroker = mongoose.model('GroupBroker',schemas.GroupBroker);
        models.SessionBroker = mongoose.model('SessionBroker',schemas.SessionBroker);
    
    }.call(root.exports));

}.call(module));