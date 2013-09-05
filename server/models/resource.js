/**
 * Model - Resource
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/**
 * Resources Schema
 */

var ResourceSchema = new Schema(
  {
    description: { type: String, trim: true },
    img_url:     { type: String },
    name:        { type: String, trim: true, unique: true },
    url:         { type: String },
    type_id:     { type: Schema.ObjectId, index: true, ref: 'Type' },
    user_id:     { type: Schema.ObjectId, index: true, ref: 'User' },
    comments:   [{ type: Schema.ObjectId, index: true, ref: 'Comment' }],
    create_at:   { type: Date, default: Date.now },
    update_at:   { type: Date, default: Date.now }
  }
)

/**
 * Methods (class method)
 */

ResourceSchema.methods = {

  newAndSave: function(name, description, img_url, url, type_id, callback) {
    this.name        = name
    this.description = description
    this.img_url     = img_url
    this.url         = url
    this.type_id     = type_id
    this.save(callback)
  }

}

/**
 * Statics (instance method)
 */

ResourceSchema.statics = {

  /**
   * List
   *
   * @param  {Object} options
   * @param  {Function} callback
   * @api public
   */
  list: function(options, callback) {
    this.find(options)
      .populate('type_id', 'name')
      .exec(callback)
  },

  /**
   * Get resource by id
   *
   * @param  {Number}   resource_id
   * @param  {Function} callback
   * @return {Object}               resource
   * @api public
   */
  getResourceById: function(resource_id, callback) {
    this.findOne({ _id: resource_id })
      .populate('type_id', 'name')
      .exec(callback)
  }

}

mongoose.model('Resource', ResourceSchema)
