/**
 * Configuration
 */

var path = require('path')

module.exports = {
  development: {
    db: {
      url: 'mongodb://localhost:27017',
      options: {
        user: '',
        pass: ''
      }
    },
    secret_token: '187c52da13e489bf2732c4ee370b050f7af495960a1f6e41ec5ba8307864a76b',
    admin: [
      ''
    ]
  },
  test: {},
  production: {}
}
