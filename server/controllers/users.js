/**
 * Controller - Users
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , sanitize = require('validator').sanitize
  , User     = mongoose.model('User')

/**
 * Create
 */

exports.create = function(req, res, next) {

  var login = sanitize(req.body.username).trim()
    , login = sanitize(login).xss()
    , login = login.toLowerCase()

  var password = sanitize(req.body.password).trim()
    , password = sanitize(password).xss()

  var user = new User()

  user.newAndSave(login, password, function(err, user) {

    if (err) { return next(err) }

    // sign in after saved...
    res.send(user)

  })
}
