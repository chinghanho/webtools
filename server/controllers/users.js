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
 * Handle user login
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.login = function(req, res, next) {
  var login = sanitize(req.body.username).trim()
    , login = sanitize(login).xss()
    , login = login.toLowerCase()

  var password = sanitize(req.body.password).trim()
    , password = sanitize(password).xss()

  // TODO: if login and password if 'false'? handle it!

  User.getUserByLogin(login, function(err, user) {
    if (err) {
      return next(err)
    }

    // TODO: if user is not exist? handle it!
  })
}

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
