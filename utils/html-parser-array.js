/* globals module require Promise */
"use strict";

const jsdom = require("jsdom").jsdom,
    doc = jsdom(),
    window = doc.defaultView, //.createWindow()
    $ = require("jquery")(window);

module.exports.parseOneItem = (selectorItems, html) => {
    $("body").html(html);
    let items = {};
    for (let selectorObj of selectorItems) {
        let item = [];
        $(selectorObj.selector).each((index, detInfo) => {
            const $detInfo = $(detInfo);
            let info = selectorObj.parse($detInfo.attr("href"), $detInfo.html());
            item.push(info);
        });
        items[selectorObj.name] = item;
    };

    return Promise.resolve(items);
};