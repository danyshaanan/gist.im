'use strict'

var GitHubApi = require('github')
var github

module.exports = function(config) {
  github = new GitHubApi({ version: '3.0.0', debug: config.debug })
  github.authenticate({ type: 'oauth', token: config.token })
  return function(id, cb) {
    github.gists.get({ id: id }, cb)
  }
}
