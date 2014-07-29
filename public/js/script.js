
'use strict'

var validGistIdRegex = /^(\d+|[\da-f]{20})$/
var config = {
  defaultGist: 'd7cbb909190194da0837'
}

function fileToHtml(file) {
  return marked(file.content)
}

function renderFromJson(gist) {
  window.gist = gist
  var htmls = Object.keys(gist.files).map(function(fileName) {
    return gist.files[fileName] && gist.files[fileName].language === 'Markdown' && fileToHtml(gist.files[fileName])
  }).filter(Boolean)
  document.querySelector('#content').innerHTML = htmls.join('<hr />')
}

function init() {
  var id = location.search.replace(/^[\?\/]/,'') || location.pathname.replace(/^[\?\/]/,'') || config.defaultGist
  if (validGistIdRegex.test(id)) {
    $.get('https://api.github.com/gists/' + id, function(gist) {
      // console.log(JSON.stringify(gist,0,2))
      renderFromJson(gist)
    });
  } else {
    document.querySelector('#content').innerHTML = 'invalid gist id'
  }
}
