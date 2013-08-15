/**
 * Routes
 */

 //

/**
 * Controllers
 */

var resources = require('../controllers/resources'),
    types = require('../controllers/types'),
    upload = require('../controllers/upload')

/**
 * Expose routes
 */

module.exports = function(app) {
  app.get('/api/types', types.list)
  app.get('/api/resources', resources.list)
  app.post('/api/resources', resources.create)
  app.post('/api/resources/image', upload.uploadImage)
}
