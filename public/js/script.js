'use strict'

function renderContent(sourceSelector) {
  var content = document.querySelector('#content')
  content.innerHTML = ''
  var source = document.querySelector(sourceSelector)
  content.appendChild(source)
  source.style.display = 'block';
}
