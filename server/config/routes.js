/**
 * Routes
 */

 //

/**
 * Controllers
 */

var users = require('../controllers/users'),
    resources = require('../controllers/resources'),
    types = require('../controllers/types'),
    upload = require('../controllers/upload')

/**
 * Expose routes
 */

module.exports = function(app) {
  app.get('/api/cookies', function(req, res, next) {
    console.info(req.cookies)
    res.send(req.cookies)
  })
  app.get('/api/types', types.list)
  app.get('/api/resources', resources.list)
  app.post('/api/users', users.create)
  app.post('/api/resources', resources.create)
  app.post('/api/resources/image', upload.uploadImage)
}
