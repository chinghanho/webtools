/**
 * Model - Resource
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

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
    create_at:   { type: Date, default: Date.now },
    update_at:   { type: Date, default: Date.now }
  }
)

/**
 * Methods（實例方法）
 */

ResourceSchema.methods = {

  newAndSave: function(name, description, img_url, url, type_id, callback) {
    this.name        = name
    this.description = description
    this.img_url     = img_url
    this.url         = url
    this.type_id = type_id
    this.save(callback)
  }

}

/**
 * Statics（類方法）
 */

ResourceSchema.statics = {

  list: function(options, callback) {
    this.find(options)
      .exec(callback)
  }

}

mongoose.model('Resource', ResourceSchema)
