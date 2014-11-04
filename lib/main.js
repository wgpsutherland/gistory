var _ = require('underscore');
var unirest = require('unirest');
var fs = require('fs');

var results = [];

module.exports = {
    run: function(name) {

        getName(name);
    }
}  

/* takes an input username and calls the recursive function getInfo to get the data from the username */
function getName(username) {

    getInfo('https://api.github.com/users/'+username+'/events?page=1');
}  

/* recursive function that keeps calling until the API does not give a next URL back */
function getInfo(url) {

    unirest.get(url) // the given URL in the function is what is called
        .headers({'content-type': 'application/json'})
        .header("User-Agent", "myuseragent")
        .send(this.data)
        .end(_.bind(function(result) {

            if(result.body.message==='Not Found') { // search for a non existant user

                console.log('This user does not exist.');

            } else if(result.headers===undefined) { // the function has been called incorrectly

                console.log('Gistory requires a string paramater.');

            } else { // valid search

                _.each(result.body, function(thing) { // for each row in the results

                    var date = new Date(Date.parse(thing.created_at)); // parses the date nicely

                    results.push({ // adds to the array which will eventually be output to the file
                        "name": thing.repo.name,
                        "date": date,
                        "type": thing.type
                    });
                });

                var URLs = parseLinkHeader(result.headers.link); // creates an array of links provided in the heard from GitHub

                if(URLs.next) { // if there is a next link then recursively call the array
                    getInfo(URLs.next); 
                } else {

                    var stream = fs.createWriteStream("./history.json"); // file name to write the output to
                    stream.once('open', function(fd) {
                        stream.write(JSON.stringify(results, null, 4));
                        stream.end();
                    });
                }
            }
        }, this));
}

/* utilitity function that converts the links given in the head to a comprehensible object */
function parseLinkHeader(header) { // parses the url given in the header of the github request and returns the urls

    if (header.length == 0) {
        throw new Error("input must not be of zero length");
    }

    var parts = header.split(','); // split parts by comma
    var links = {};
    _.each(parts, function(p) { // parse each part into a named link
        var section = p.split(';');
        if (section.length != 2) {
            throw new Error("section could not be split on ';'");
        }
        var url = section[0].replace(/<(.*)>/, '$1').trim();
        var name = section[1].replace(/rel="(.*)"/, '$1').trim();
        links[name] = url;
    });

    return links;
}