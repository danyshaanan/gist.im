'use strict'

function fileToHtml(file) {
  return marked(file.content)
}

function renderFromJson(gist) {
  window.gist = gist
  var htmls = Object.keys(gist.files).map(function(fileName) {
    return fileToHtml(gist.files[fileName])
  })
  document.querySelector('#content').innerHTML = htmls.join('<hr />')
}
