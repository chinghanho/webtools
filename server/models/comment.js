/**
 * Model - Comment
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

/**
 * Comment Schema
 */

var CommentSchema = new Schema(
  {
    body:        { type: String },
    user_id:     { type: Schema.ObjectId, index: true, ref: 'User' },
    resource_id: { type: Schema.ObjectId, index: true, ref: 'Resource' },
    create_at:   { type: Date, default: Date.now },
    update_at:   { type: Date, default: Date.now }
  }
)
