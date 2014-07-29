'use strict'

var config = require('./config') //either js: 'module.exports = {}' or json: '{}'
var getGist = require('./lib/getGist.js')(config)
var fs = require('fs')
var express = require('express')

var validGistIdRegex = /^(\d+|[\da-f]{20})$/
var template = fs.readFileSync('./assets/index.htm')

function logStatistics(gist) {
  var total = gist.meta['x-ratelimit-limit']
  var minutesToReset = ((gist.meta['x-ratelimit-reset'] - 1*new Date()/1000)/60).toFixed(2)
  console.log('%d/%d requests used. Reset in %d minutes. %s', total-gist.meta['x-ratelimit-remaining'], total, minutesToReset, gist.id)
}

function minimizeGist(gist) {
  return {
    url: gist.url,
    id: gist.id,
    html_url: gist.html_url,
    public: gist.public,
    created_at: gist.created_at,
    updated_at: gist.updated_at,
    description: gist.description,
    comments: gist.comments,
    user: gist.user,
    files: Object.keys(gist.files).reduce(function(result, fileName) {
      result[fileName] = gist.files[fileName].language === 'Markdown' && gist.files[fileName]
      return result
    }, {}),
  }
}

function renderGist(id, res) {
  res.write(template)
  getGist(id, function(error, gist) {
    if (error) return res.end('error!')
    logStatistics(gist)
    var files = Object.keys(gist.files).map(function(filename){return gist.files[filename]})
    res.end('<script>\nrenderFromJson(' + JSON.stringify(minimizeGist(gist),0,config.clientJsonSpaces) + ')\n</script>')
  })
}

var app = express()
app.use(express.static(__dirname + '/public/'))
app.get(/^(.*)$/, function(req, res, next) {
  var requestPath = req.params[0].replace(/^\//,'') || config.defaultGist
  if (validGistIdRegex.test(requestPath)) renderGist(requestPath, res)
  else res.send('not a valid gist id')
})

app.use(function(err, req, res, next){
  console.error(err.stack)
  res.status(500).end('Something broke!')
})

app.listen(config.port)
console.log('now listening to port', config.port)



//
