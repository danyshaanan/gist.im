# markdown-gist-site

#### A website that displays markdown gists at /gist-id

Inspired by gist.io

This is basically a static one-page site,
that is served on any path that is a valid gist id.
(hence the use of express).
The page, on the client side,
fetches the content of the gist with that id,
and renders all markdown files in it as html.


#### TODO:
* Add html structure + gist and gist author data
* Add css
