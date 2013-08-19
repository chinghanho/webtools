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
      res.cookie('remember_token', user.remember_token, { signed: true })
      res.send({
        "login": user.login,
        "id": user._id,
        "update_at": user.update_at,
        "create_at": user.create_at
      })
    }
    else {
      res.send({message: 'Not Found'})
    }

  })

}

/**
 * Check client authentication
 */
exports.check = function(req, res, next) {

  var remember_token = req.signedCookies['remember_token']

  if (remember_token) {
    User.findUserByRememberToken(remember_token, function(err, user) {

      if (err) { return next(err) }

      if (user) {
        res.send({
          "login": user.login,
          "id": user._id,
          "update_at": user.update_at,
          "create_at": user.create_at
        })
      }
      else {
        res.send({message: 'Not Found'})
      }
    })
  }
  else {
    res.send({message: 'Not Found'})
  }
}
