'use strict'

var config = require('./config') //either js: 'module.exports = {}' or json: '{}'
var GitHubApi = require('github')
var marked = require('marked')
var express = require('express')

var github = new GitHubApi({
  version: '3.0.0',
  // optional
  // debug: true,
  protocol: 'https',
  // pathPrefix: '/api/v3', // for some GHEs
  timeout: 5000
})

github.authenticate({ type: 'oauth', token: config.token })

var app = express()

app.use(express.static(__dirname + '/public/'))

app.get(/^(.*)$/, function(req, res, next) {
  var requestPath = req.params[0].replace(/^\//,'')
  if (requestPath === '') requestPath = config.defaultGist
  //varify requestPath against a regex
  github.gists.get({ id: requestPath }, function(error, gist) {
    if (error) return res.send('error!')
    var firstFile = gist.files[Object.keys(gist.files)[0]]
    if (firstFile.language === 'Markdown') res.send(marked(firstFile.content))
    else res.send('not a markdown file')
  })
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something broke!')
});

app.listen(config.port)
console.log('now listening to port', config.port)



//
