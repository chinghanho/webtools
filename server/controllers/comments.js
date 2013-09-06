/**
 * Controller - Resources
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Comment = mongoose.model('Comment')
  , sanitize = require('validator').sanitize

/**
 * Create
 */

exports.create = function(req, res, next) {

  var user = sanitize(req.body.user).trim()
    , user = sanitize(user).xss()

  var body = sanitize(req.body.body).trim()
    , body = sanitize(body).xss()

  var resource = sanitize(req.body.resource).trim()
    , resource = sanitize(resource).xss()

  var comment = new Comment()

  comment.newAndSave(body, user, resource, function(err, comment) {

    if (err) {
      console.error(err)
      return next(err)
    }
    else if (!comment) {
      var err_msg = "Comment not saved"
      res.send(403, err_msg)
      return next(new Error(err_msg))
    }

    User.findByUserId(user, function(err, user) {
      user.comments.push(comment)
      user.comments_count += 1
      user.save()
    })

    Resource.findByResourceId(resource, function(err, resource) {
      resource.comments.push(comment)
      resource.comments_count += 1
      resource.save()
    })

  })

}
