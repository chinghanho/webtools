/**
 * Controller - Sessions
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , User     = mongoose.model('User')
  , sanitize = require('validator').sanitize

/**
 * Handle user login
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 * @param {Function} next
 */
exports.create = function(req, res, next) {

  var login = sanitize(req.body.username).trim()
    , login = sanitize(login).xss()
    , login = login.toLowerCase()

  var password = sanitize(req.body.password).trim()
    , password = sanitize(password).xss()

  // TODO: if login and password is 'false'? handle it!

  User.getUserByLogin(login, function(err, user) {

    if (err) { return next(err) }

    if (user && user.authenticate(password)) {
      res.send(user)
    }
    else {
      res.send('')
    }

  })

}
