/**
 * Routes
 */

 //

/**
 * Module dependencies
 */

var users     = require('../controllers/users')
  , resources = require('../controllers/resources')
  , types     = require('../controllers/types')
  , upload    = require('../controllers/upload')
  , sessions  = require('../controllers/sessions')
  , mongoose  = require('mongoose')
  , User      = mongoose.model('User')

/**
 * Expose routes
 */

module.exports = function(app) {

  app.get('/resources/:id', function(req, res, next) {
    res.redirect('/#/resources/' + req.param('id'))
  })
  app.get('/admin', function(req, res, next) {
    res.redirect('/#/admin')
  })

  app.get('/api/types', types.index)
  app.post('/api/types', isAuthenticated, requireAdmin, types.create)

  app.post('/api/sessions', sessions.create)

  app.post('/api/users', users.create)

  app.get('/api/resources', resources.index)
  app.post('/api/resources', isAuthenticated, resources.create)
  app.post('/api/resources/image', isAuthenticated, upload.uploadImage)

}

function isAuthenticated(req, res, next) {

  var remember_token = req.signedCookies['remember_token']

  if (remember_token) {
    User.findUserByRememberToken(remember_token, function(err, user) {

      if (err) { return next(err) }
      next()

    })
  }
  else {
    next(new Error(401))
  }

}

function requireAdmin(req, res, next) {

  var remember_token = req.signedCookies['remember_token']

  if (remember_token) {
    User.findUserByRememberToken(remember_token, function(err, user) {

      if (err) { return next(err)}
      if (user.role == 'admin') { next() }
      else { res.send({message: 'Could not authenticate you.'}) }

    })
  }
  else {
    next(new Error(401))
  }

}
