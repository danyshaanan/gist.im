'use strict'

function catchGistId(str) {
  return str
    .replace(/(.*\/\/)?[^\/]+[\/#]/, '')
    .split(/[\?\/#]/)
    .reduce(function(id, part) {
      if (id) return id
      if (/^\d+|[\da-f]{20}$/.test(part)) return part
    }, null)
}

////////////////////////////////////////////////////////////////////////////////

const ids = [
  '8071935',
  '80719359190194da0837',
  'd7cbb909190198071935',
  '80719359190198071935',
  'd7cbb909190194da0837',
  'aaaaaaaaaaaaaaaaaaaa'
]

const patterns = [
  'http://x.com/#ID?x=1',
  'http://x.com/#ID',
  'http://x.com#ID',
  'http://x.com/ID',
  'http://x.com/ID/',
  'http://x.com/ID#hash',
  'http://x.com/ID?x=1',
  'http://x.com/ID?x=1&y=2',
  'http://x.com/ID?x=1#hash',
  'http://x.com/ID?x=1&y=2#hash',
  'http://x.com/',
  'http://x.com/d7cbb909190194da083',
  'http://x.com/aaaaaaaaaaa/ffffffffffff',
]

for (let id of ids) {
  for (let pattern of patterns) {
    if (catchGistId(pattern.replace('ID', id)) !== (~pattern.indexOf('ID') ? id : undefined)) {
      throw `Error! Failed on ${pattern} with ${id}`
    }
  }
}
