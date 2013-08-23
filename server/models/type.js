/**
 * Model - Type
 */

 /**
  * Module dependencies
  */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema

/**
 * Type Schema
 */

var TypeSchema = new Schema(
  {
    name:            { type: String, unique: true },
    resources:       [{ type: Schema.ObjectId, index: true, ref: 'Resource' }],
    resources_count: { type: Number, default: 0 },
    create_at:       { type: Date, default: Date.now }
  }
)

/**
 * Methods（實例方法）
 */

TypeSchema.methods = {

  newAndSave: function(name, callback) {
    this.name = name
    this.save(callback)
  }

}

 /**
  * Statics（類方法）
  */

TypeSchema.statics = {

  getTypeById: function(type_id, callback) {
    this.findOne({ _id: type_id })
      .exec(callback)
  },

  list: function(options, callback) {
    this.find(options)
      .exec(callback)
  }

}

mongoose.model('Type', TypeSchema)
