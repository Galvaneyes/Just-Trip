/* globals module require */

const httpRequester = require("../../../utils/http-requester");
const htmlParser = require("../../../utils/html-parser");


module.exports = function (data) {

    function parseAll(href, html) {
        let res = "(" + href + ")" + html;
        return res;
    }

    function waitRandom(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, Math.random() * time);
        });
    }

    function getDestinationInfo(urlMain) {
        if (urlCountries.length === 0) {
            return Promise.resolve({ title: "Finished" });
        }
        let country = urlCountries.pop();
        let url = urlMain + country.url;
        console.log("Working with countries urls: " + url);
        return httpRequester.get(url)
            .then(result => {
                let selector = 'div.hl > div:nth-child(1) > ul > li';
                const html = result.body;
                return htmlParser.simpleParser(selector, html);
            })
            .then(items => {
                let description = "";
                for (let item of items) {
                    description += item.title;
                }

                let obj = {
                    name: country.title,
                    description: description,
                    countryUrl: url
                };
                data.createCountry(obj);
                console.log("save from" + url);
                return waitRandom(5000).then(() => { return getDestinationInfo(urlMain); });
            })

            .catch(err => {
                console.dir(err, { colors: true });
            });
    }

    function getList(url) {
        return httpRequester.get(url)
            .then(result => {
                //let selector = 'body > header > div.r3 > ul > li';
                let selector = 'a[href*="/d/"]';
                const html = result.body;
                //console.log("html:" + html);

                return htmlParser.simpleParser(selector, html);
            })
            .catch(err => {
                console.dir(err, { colors: true });
            });
    }

    function getParallel() {
        let parallelScrappingPromises = [];
        for (let i = 0; i < 5; i += 1) {
            parallelScrappingPromises.push(getDestinationInfo(`http://www.tourradar.com`));
        }
        return Promise.all(parallelScrappingPromises);
    }

    var urlCountries;

    return {
        getHits(req, res) {
            getList(`http://www.tourradar.com`)
                .then(resultList => {
                    urlCountries = resultList; //.slice(0, 20);
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