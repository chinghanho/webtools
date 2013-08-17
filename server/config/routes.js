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

/**
 * Expose routes
 */

module.exports = function(app) {

  app.get('/api/cookies', function(req, res, next) {
    // console.info(req.cookies.remember_token)
    res.send(req.cookies)
  })

  app.get('/api/types', types.index)
  app.get('/api/resources', resources.index)
  app.post('/api/sessions', sessions.create)
  app.post('/api/users', users.create)
  app.post('/api/resources', resources.create)
  app.post('/api/resources/image', upload.uploadImage)

}

function isAuthenticated(req, res, next) {
  // var remember_token = req.cookies.remember_token
}
