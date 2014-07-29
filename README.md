markdown-gist-server
=========

A nodejs server that renders a markdown gist as html at /that-gist-id

Inspired by gist.io


#### Planned flow:
1. Client requests `/gist-id`
2. Server returns static html
3. 
 * Server fetches gist from github, renders html, stores result
 * Static html polls server for result, then shows it
