# GitHub-user-history

A Node.js tool that returns the history of a given GitHub user as a .json file.

##Installation

Install with the Node.JS package manager [npm](http://npmjs.org/):

    $ npm install github-user-history

or

Install via git clone:

    $ git clone git://github.com/wgpsutherland/github-user-history.git
    $ cd github-user-history
    $ npm install

##Use

In your project or in the node command line you can do the following:

    var history = require('github-user-history');
    history.run('wgpsutherland'); // the string can be any valid GitHub username

This will create a file called history.json in the root directory which looks something like this:

    [
        {
            "name": "wgpsutherland/github-user-history",
            "date": "2014-11-03T19:43:21.000Z"
        },
        {
            "name": "wgpsutherland/github-user-history",
            "date": "2014-11-03T19:37:18.000Z"
        },
        {
            "name": "wgpsutherland/github-scraper",
            "date": "2014-11-03T14:18:45.000Z"
        }...
    ]

    