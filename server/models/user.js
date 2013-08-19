/**
 * Model - User
 */

/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema   = mongoose.Schema
  , crypto   = require('crypto')
  , bcrypt   = require('bcrypt')

/**
 * User Schema
 */

var UserSchema = new Schema(
  {
    name:             { type: String },
    login:            { type: String, unique: true },
    salt:             { type: String },
    hashed_password:  { type: String },
    email:            { type: String },
    role:             { type: String },
    remember_token:   { type: String },
    create_at:        { type: Date, default: Date.now },
    update_at:        { type: Date, default: Date.now }
  }
)

/**
 * Virtuals
 */

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() { return this._password })


/**
 * Hooks
 */

UserSchema.pre('save', function(next) {
  var that = this
  this.new_remember_token(function(remember_token) {
    that.remember_token = remember_token
    next()
  })
})

/**
 * Methods（實例方法）
 */

UserSchema.methods = {

  /**
   * Authenticate - check if the passwords are the same
   *
   * @param  {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) == this.hashed_password
  },

  newAndSave: function(login, password, callback) {
    this.login = login
    this.password = password
    this.save(callback)
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function() {
    return bcrypt.genSaltSync(10)
  },

  /**
   * Encrypt password
   *
   * @param  {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      var bcrypted = bcrypt.hashSync(password, this.salt)
      return bcrypted
    } catch (err) {
      console.error(err)
      return ''
    }
  },

  /**
   * Generate a random URL-safe token
   */
  new_remember_token: function(callback) {
    crypto.randomBytes(32, function(ex, buf) {
      callback(buf.toString('hex'))
    })
  }

}

/**
 * Statics（類方法）
 */

UserSchema.statics = {

  /**
   * Get user by login
   * @param  {String}   login
   * @param  {Function} callback
   * @return {Object}            user
   */
  getUserByLogin: function(login, callback) {
    this.findOne({ login: login })
      .exec(callback)
  },

  findUserByRememberToken: function(remember_token, callback) {
    this.findOne({ remember_token: remember_token })
      .exec(callback)
  }

}

mongoose.model('User', UserSchema)
