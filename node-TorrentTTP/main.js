
var express = require('express'),
    controllers = require('./controllers');

var app = module.exports = express.createServer();

// Configuration

app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function () {
    app.use(express.errorHandler());
});

// Routes

app.get('/files/:id?',controllers.files.get);
app.get('/shares/:id?',controllers.shares.get);
app.get('/users/:id?',controllers.users.get);
app.get('/groups/:id?',controllers.groups.get);
app.get('/sessions/:id?',controllers.sessions.get);

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
