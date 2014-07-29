'use strict'

var config = require('./config') //either js: 'module.exports = {}' or json: '{}'
var express = require('express')

var app = express()
app.use(express.static(__dirname + '/public/'))
app.get(/^(.*)$/, function(req, res, next) {
  return res.sendfile(__dirname + '/public/query.htm')
})

app.listen(config.port)
console.log('now listening to port', config.port)



//
