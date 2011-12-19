(function () {

    var root = this;
    
    (function () {
    
        var controllers = this;
    
        controllers.files = require('./files.js');
        controllers.groups = require('./groups.js');
        controllers.sessions = require('./sessions.js');
        controllers.shares = require('./shares.js');
        controllers.users = require('./users.js');
        
        controllers.trust_brokers = require('./trust_brokers.js');
        controllers.file_brokers = require('./file_brokers.js');
        controllers.share_brokers = require('./share_brokers.js');
        controllers.user_brokers = require('./user_brokers.js');
        controllers.group_brokers = require('./group_brokers.js');
        controllers.session_brokers = require('./session_brokers.js');
    
    }.call(root.exports));

}.call(module));