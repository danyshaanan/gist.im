# Gist.im

#### Yet another Gist-powered writing platform - WIP

Inspired by [gist.io](http://gist.io) and similar to [roughdraft.io](http://roughdraft.io), [**gist.im**](http://gist.im) renders markdown gists as html. If you want to view `gist.github.com/danyshaanan/8071935`, just go to `gist.im/8071935`.

This is a work in progress, so if you want to do more than play around - use [roughdraft.io](http://roughdraft.io)

gist.im is different by being almost entirely client-side. The server side bit is used to answer any request to `gist.im/valid-gist-id` with the default index.htm file which starts the magic. For this, I'm using NodeJS+ExpressJS, but this could be easily done with any other server software.

#### Quick start

```bash
git clone git@github.com:danyshaanan/gist.im.git
cd gist.im
npm i
npm start
# Open localhost:3000/
```

#### TODO
* Add html structure + gist and gist author data
* Add css
