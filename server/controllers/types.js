/**
 * Controller - Types
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Type     = mongoose.model('Type')

/**
 * List
 */

exports.index = function(req, res, next) {

  Type.list({}, function(err, data) {
    res.send(data)
  })

}
