'use strict'

var config = require('./config') //either js: 'module.exports = {}' or json: '{}'
var getGist = require('./lib/getGist.js')(config)
var marked = require('marked')
var express = require('express')

var validGistIdRegex = /^(\d+|[\da-f]{20})$/

function renderGist(id, res) {
  res.write('<script>function copy(from,to){document.querySelector(to).innerHTML=document.querySelector(from).innerHTML}</script><body><div id="content">loading...</div></body>')
  getGist(id, function(error, gist) {
    if (error) return res.end('error!')
    var files = Object.keys(gist.files).map(function(filename){return gist.files[filename]})
    var mdFiles = files.filter(function(file){return file.language === 'Markdown'})
    var html = mdFiles.map(function(file){return marked(file.content)}).join('<hr />')
    res.end('<span id="source" style="display:none">' + html + '</span><script>copy("#source","#content")</script>')
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
