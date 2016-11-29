/* globals module require */

const httpRequester = require("../../../utils/http-requester");
const htmlParser = require("../../../utils/html-parser");
//const DataCountry = require("../../data/country-data");


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

function getDestinationInfo(urlMain) {
    let url = urlMain + urlCountries.pop().url;
    console.log("Working with countries urls: " + url);
    return httpRequester.get(url)
        .then((result) => {
            let selector = 'div.hl > div:nth-child(1) > ul > li';
            const html = result.body;
            return htmlParser.simpleParser(selector, html);
        })
        .then(items => {
            let urlArray = url.split('/');
            name = urlArray[urlArray.length - 1];
            let description = "";
            for (let item of items) {
                description += item.title;
            }

            let obj = {
                name: name,
                description: description,
                countryUrl: url
            };
            countryData.createCountry(obj);
            console.log("save from" + url);
            if (urlCountries.length === 0) {
                return Promise.resolve([{ title: "done" }]);
            }
            else {
                return getDestinationInfo(urlMain);
            }
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
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

function getParallel() {
    return getDestinationInfo(`http://www.tourradar.com`)
        .then(resultList => {
            console.log("Parallel");
            return Promise.resolve(resultList);
        })
        .catch((err) => {
            console.dir(err, { colors: true });
        });
}

var urlCountries;
var countryData;
module.exports = function () {
    return {
        getHits(req, res, countryData_) {
            countryData = countryData_;
            getList(`http://www.tourradar.com`).then(resultList => {
                urlCountries = resultList.slice(0, 10);
                return getParallel();
            })
                .then(r => {
                    return res.render("tour-list", {
                        result: r
                    });
                });
        }
    };
};

//node --max_old_space_size=4096 app