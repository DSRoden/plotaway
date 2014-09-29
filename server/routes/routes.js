'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    debug          = require('../lib/debug'),
    security       = require('../lib/security'),
    home           = require('../controllers/home'),
    boards          = require('../controllers/boards'),
    pages          = require('../controllers/pages'),
    trips          = require('../controllers/trips'),
    users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../../public'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  app.use(security.authenticate);
  app.use(debug.info);

  app.get('/home', home.index);
  app.post('/register', users.register);
  app.post('/login', users.login);
  app.delete('/logout', users.logout);

  app.use(security.bounce);
  app.post('/newboard', boards.create);
  app.get('/boards', boards.all);
  app.post('/board', boards.findBoard);
  //app.post('/pages', pages.all);
  app.post('/setpage', pages.set);

  app.post('/newtrip', trips.create);
  app.get('/trips', trips.index);
  app.post('/settrip', trips.set);
  app.get('/lasttrip', trips.last);
  app.post('/newpage', pages.create);

  console.log('Express: Routes Loaded');
};

