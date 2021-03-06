# gistory

A Node.js tool that returns the history of a given GitHub user as a .json file.

##Installation

Install with the Node.JS package manager [npm](http://npmjs.org/):

    $ npm install gistory

or

Install via git clone:

    $ git clone git://github.com/wgpsutherland/gistory.git
    $ cd gistory
    $ npm install

##Use

In your project or in the node command line you can do the following:

    var gistory = require('gistory');
    gistory.run('wgpsutherland'); // the string can be any valid GitHub username

This will create a file called history.json in the root directory which looks something like this:
    
    [
        {
            "name": "wgpsutherland/github-user-history",
            "date": "2014-11-03T23:14:39.000Z",
            "type": "PushEvent"
        },
        {
            "name": "wgpsutherland/github-user-history",
            "date": "2014-11-03T23:04:13.000Z",
            "type": "PushEvent"
        },
        {
            "name": "wgpsutherland/github-user-history",
            "date": "2014-11-03T19:43:21.000Z",
            "type": "PushEvent"
        }...
    ]
    
