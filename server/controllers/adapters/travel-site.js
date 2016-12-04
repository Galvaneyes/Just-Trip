
const httpRequester = require("../../../utils/http-requester");
const htmlParser = require("../../../utils/html-parser");
const htmlParserArray = require("../../../utils/html-parser-array");


module.exports = function (data) {

    function parseAll(href, html) {
        let res = "(" + href + ")" + html;
        //  console.log('===========ALL:' + res);
        return res;
    }
    function parsePlaces(href, html) {
        return { url: href, html };
    }
    function parseTitle(href, html) {
        return html.replace("Travel Guide", "").trim();
    }

    function getImageUrl(imageUrl_Descr) {
        let a = imageUrl_Descr.split("<br>")[0];
        //console.log("a----:"+a);
        return a.split("\"")[1];
    }
    function getDescr(imageUrl_Descr) {
        return imageUrl_Descr.split("<br>\n")[1];
    }
    function waitRandom(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, Math.random() * time);
        });
    }

    function getDestinationInfo() {
        if (urlCountries.length === 0) {
            return Promise.resolve({ title: "Finished" });
        }
        let url = urlCountries.pop().url;
        console.log(`Working with Url: ${url}`);
        return httpRequester.get(url)
            .then(result => {
                let selectors = [];
                selectors.push({ name: 'imageUrl_Descr', selector: 'div.entry-content > p:nth-child(2)', parse: parseAll });
                selectors.push({ name: 'places', selector: 'ul.places > li > a', parse: parsePlaces });
                selectors.push({ name: 'title', selector: 'header > h1', parse: parseTitle });

                const html = result.body;
                return htmlParserArray.parseOneItem(selectors, html);
            })
            .then(item => {
                let imageUrl_Descr = item["imageUrl_Descr"][0];
                let pictureUrl = getImageUrl(imageUrl_Descr);
                //let title = getTitle(imageUrl);
                let title = item["title"][0];
                let description = getDescr(imageUrl_Descr);
                let places = item["places"];

                //  console.log("save from:" + url);
                //  console.log({ title, imageUrl, descr, places });
                console.log(places);
                let city = [];
                for (let place of places) {
                    city.push(place.html);
                    place.country = title;
                    urlPlaces.push(place);
                }
                let obj = {
                    name: title,
                    description: description,
                    pictureUrl: pictureUrl,
                    countryUrl: url,
                    city: city
                };

                data.createCountry(obj);
                console.log("save from" + url);
                return waitRandom(5000).then(() => { return getDestinationInfo(); });
            })

            .catch(err => {
                console.dir(err, { colors: true });
            });
    }

    function getDestinationInfoPlaces() {
        if (urlPlaces.length === 0) {
            return Promise.resolve({ title: "Finished" });
        }
        let place = urlPlaces.pop();
        console.log(place);
        let url = place.url;
        console.log(`Working with Url: ${url}`);
        return httpRequester.get(url)
            .then(result => {
                let selectors = [];
                selectors.push({ name: 'imageUrl_Descr', selector: 'div.entry-content > p:nth-child(2)', parse: parseAll });
                selectors.push({ name: 'title', selector: 'header > h1', parse: parseTitle });

                const html = result.body;
                return htmlParserArray.parseOneItem(selectors, html);
            })
            .then(item => {
                let imageUrl_Descr = item["imageUrl_Descr"][0];
                let pictureUrl = getImageUrl(imageUrl_Descr);
                let title = item["title"][0];
                let description = getDescr(imageUrl_Descr);

                let obj = {
                    name: title,
                    description: description,
                    pictureUrl: pictureUrl,
                    cityUrl: url,
                    country: place.country
                };
                console.log(obj);
                data.createCity(obj);
                console.log("save from" + url);
                return waitRandom(5000).then(() => { return getDestinationInfoPlaces(); });
            })

            .catch(err => {
                console.dir(err, { colors: true });
            });
    }


    function getList(url) {
        return httpRequester.get(url)
            .then(result => {
                let selector = 'a[href*="/travel-guides/"]';
                const html = result.body;
                //console.log("===============html:" + html);
                return htmlParser.simpleParser(selector, html);
            })
            .catch(err => {
                console.dir(err, { colors: true });
            });
    }


    function getParallel() {
        let parallelScrappingPromises = [];
        for (let i = 0; i < 5; i += 1) {
            parallelScrappingPromises.push(getDestinationInfo());
        }
        return Promise.all(parallelScrappingPromises);
    }

    function getParallelPlaces() {
        let parallelScrappingPromises = [];
        for (let i = 0; i < 5; i += 1) {
            parallelScrappingPromises.push(getDestinationInfoPlaces());
        }
        return Promise.all(parallelScrappingPromises);
    }


    var urlCountries = [];
    var urlPlaces = [];

    return {
        getHits(req, res) {
            //getList(`http://travel.usnews.com/Rankings/Best_Europe_Vacations/`)
            getList(`http://www.nomadicmatt.com/travel-guides/`)
                .then(resultList => {
                    console.log("length: " + resultList.length);
                    urlCountries = resultList;//.slice(60, 66);
                    //urlPlaces = [{ url: "http://www.nomadicmatt.com/travel-guides/caribbean-travel-tips/st-lucia/", country: "caribbean" }];
                    return getParallel().then(() => getParallelPlaces())
                })
                .then(r => {
                    return res.render("tour-list", {
                        result: r
                    });

                })
        }
    };
}

//node --max_old_space_size=4096 app