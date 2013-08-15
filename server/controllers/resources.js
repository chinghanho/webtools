/**
 * Controller - Resources
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    Resource = mongoose.model('Resource'),
    Type     = mongoose.model('Type')

/**
 * List
 */

exports.list = function(req, res, next) {

  Resource.list({}, function(err, data) {
    res.send(data)
  })

}

/**
 * Create
 */

exports.create = function(req, res, next) {

  var name        = req.body.name,
      description = req.body.description,
      img_url     = req.body.img_url,
      url         = req.body.url,
      type_id     = req.body.type,
      resource    = new Resource()

  resource.newAndSave(name, description, img_url, url, type_id, function(err, resource) {

    if (err) { return next(err); }

    Type.getTypeById(req.body.type, function(err, type) {
      type.resources_count += 1
      type.save()
    })
    res.send(resource)

  });
}
