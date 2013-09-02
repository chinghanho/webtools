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

    if (err) {
      console.error(err)
      if (err.code == 11000)
        res.send(403, 'Username is already taken.')
      return next(err)
    }
    else if (!user) {
      var err_msg = "User not created"
      res.send(403, err_msg)
      return next(new Error(err_msg))
    }

    res.cookie('remember_token', user.remember_token, { signed: true })
    res.send({
      "login": user.login,
      "role": user.role,
      "id": user._id,
      "update_at": user.update_at,
      "create_at": user.create_at
    })

  })
}
