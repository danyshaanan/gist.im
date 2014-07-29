'use strict'

function fileToHtml(file) {
  return marked(file.content)
}

function renderFromJson(gist) {
  window.gist = gist
  var htmls = Object.keys(gist.files).map(function(fileName) {
    return gist.files[fileName] && fileToHtml(gist.files[fileName])
  }).filter(Boolean)
  document.querySelector('#content').innerHTML = htmls.join('<hr />')
}
