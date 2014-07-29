'use strict'

var config = require('./config') //either js: 'module.exports = {}' or json: '{}'
var express = require('express')

var validGistIdPathRegex = /^\/(\d+|[\da-f]{20})$/

var app = express()
app.use(express.static(__dirname + '/public/'))
app.get(validGistIdPathRegex, function(req, res, next) {
  return res.sendfile(__dirname + '/public/query.htm')
})

// Add error on invalid paths

var port = config.port || 3000

app.listen(port)
console.log('now listening to port', port)



//
