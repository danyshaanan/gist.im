markdown-gist-server
=========

A nodejs server that renders a markdown gist as html at /that-gist-id

Inspired by gist.io


#### TODO:
* Add html structure
* Add css
* Send to client gist metadata, use for &lt;title&gt;, last updated, etc
* Check client side md rendering (could be implemented side by side)
* improve error handling
* Add caching (volatile/fs/db? "late" caching?)
