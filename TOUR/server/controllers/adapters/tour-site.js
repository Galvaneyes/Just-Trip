/* globals module require */

const httpRequester = require("../../../utils/http-requester");
const htmlParser = require("../../../utils/html-parser");


function parseAll(href, html) {
    let res = "(" + href + ")" + html;
    //  console.log('===========ALL:' + res);
    return res;
}

function wait(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function getDestinationInfo(url) {
    return httpRequester.get(url)
        .then((result) => {
            let selector = 'div.hl > div:nth-child(1) > ul > li';
            const html = result.body;
            return htmlParser.simpleParser(selector, html);
        })
        .then(items => {
            for (let item of items) {
                name=url.split('/')[url.length-1];
                let obj = {
                    name: name,
                    description: item.title,
                    countryUrl: url
                }
            }
            return items;
        })

        .catch((err) => {
            console.dir(err, { colors: true });
        });
}


function getList(url) {
    return httpRequester.get(url)
        .then((result) => {
            //let selector = 'body > header > div.r3 > ul > li';
            let selector = 'a[href*="/d/"]';
            const html = result.body;
            //console.log("html:" + html);

            return htmlParser.simpleParser(selector, html);
        })
        .then(items => {
            // items = items.map(a => { return a; });
            for (let item of items) {
                // console.log("item:" + item.url);
                getDestinationInfo(url + item.url);
            }
            return items;
        })

        .catch((err) => {
            console.dir(err, { colors: true });
        });
}


module.exports = function () {
    return {
        getHits(req, res) {
            getDestinationInfo(`http://www.tourradar.com/d/bulgaria`).then(resultList => {
                //getList(`http://www.tourradar.com`).then(resultList => {
                return res.render("tour-list", {
                    result: resultList
                });
            });
        }
    };
};

//node --max_old_space_size=4096 app