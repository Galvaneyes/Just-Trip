/* globals require console */
"use strict";

const config = require("./server/config");
const data = require("./server/data")(config);
const { app, server } = require("./server/config/application")({ data });
let io = require("./server/config/sockets")({ server });
require("./server/routers")({ app, data, io });

server.listen(config.port, () => {
    console.log(`Application listen on port: ${config.port}`);
});


// TEST FOR CREATING AND FINDING
// const admin = {
//     username: "admin",
//     password: "pass",
//     email: "no@email.com",
//     firstname: "no",
//     lastname: "name",
//     age: 14,
//     country: "Bulgaria",
//     city: "Sofia",
//     roles: ["admin"]
// };

// const tour = {
//     creator: "ghost",
//     headline: "SPA WEEK IN TELERIK",
//     city: "Sofia",
//     country: "Bulgaria",
//     description: "Code all day, every day!",
//     price: 169,
//     maxUser: 20,
//     endJoinDate: Date.now(),
//     beginTourDate: Date.now(),
//     endTourDate: Date.now(),
//     isValid: true
// };

// console.log("tova e-------------------------------");
// const Country = require("./server/models/country-model.js");
// const dataModule = require("./server/data/country-data")({ Country });
// dataModule.getAllCountries_()
//     .then(result => {
//         console.log("start-------------------------------");
//         console.log(result[0]);
//         console.log("end-------------------------------");
//     }
//     )


// data.getTourById("583f1af52da8b22fd842ff8a")
//     .then(tourId => {
//         console.log(tourId);
//     })
//     .catch(err => {
//         console.log(err);
//         data.createTour(tour);
//     });

// data.getUserByUsername(admin.username)
//     .then(user => {
//         //console.log(user);
//     })
//     .catch(err => {
//         console.log(err);
//         return data.createUser(admin);
//     });
// END OF TEST

// data.getUsersBySpecificCriteria({email: "no@email.com", age: 14})
//     .then(user => {
//         console.log(user);
//     })
//     .catch(err => {
//         console.log(err);
//         return data.createUser(admin);
//     })

// data.getToursInRangeOfDates(new Date("2016-12-10T18:29:18.332Z"), new Date("2016-12-12T18:29:18.332Z"))
//     .then(tours => {
//         console.log(tours);
//     })
//     .catch(err => {
//         console.log(err);
//     })

// let search = {
//     city: "Plovdiv",
//     obj:[{name:"ivan"}, {name:"Petar"}],
//     country: "Bulgaria",
//     beginTourDate: { $gte: new Date("2016-12-1")},
//     endTourDate:{ $lte: new Date("2016-12-3")}
// };

// let searchh = {
//     city: 'Sofia',
//     obj:[{name:"ivan"}, {name:"gogo"}],
//     country: 'Bulgaria',
//     beginTourDate: { '$gt': new Date('2016-11-29') },
//     endTourDate: { '$lt': new Date('2016-12-6') }
// };

// let sear = [search, searchh];

// sear.forEach(x => {
//     x.obj.forEach(x => {
//         if(x.name == "ivan") {
//             x.isDeleted = "true";
//         }
//     })
// });

// console.log(sear[0]);

// Promise.all(sear.map(x => data.getSearchResults(x)))
//     .then(x => {
//         console.log(x);
//     });

// data.getSearchResults(search)
//     .then(tours => {
//         console.log(tours);
//     })
//     .catch(err => {
//         console.log(err);
//     });

//COUNTRY TEST
// const Bulgaria = {
    // name: "Bulgaria",
    // description: "Place nice yet misleading info here",
    // countryUrl: "I_be_a_proper_url.com",
    // city: ["Sofia", "Harmanli"]
// };

// const USA = {
    // name: "USA",
    // description: "Why bother with actual info, too many people would hate anyway",
    // countryUrl: "freedomIsntFreeNorIsItReal.com",
    // city: ["Washington", "Seattle"]
// };

// const Sofia = {
    // name: "Sofia",
    // description: "Sofia descr",
    // cityUrl: "sofia.com",
    // country: "Bulgaria"
// }

// const Seattle = {
    // name: "Seattle",
    // description: "Seattle descr",
    // cityUrl: "seattle.com",
    // country: "USA"
// }

// data.getCountryByName("USA")
    // .then(country => {
        // console.log(country);
    // })
    // .catch(err => {
        // console.log(err);
        // data.createCountry(USA);
    // });

// data.getCountryByName("Bulgaria")
    // .then(country => {
        // console.log(country);
    // })
    // .catch(err => {
        // console.log(err);
        // data.createCountry(Bulgaria);
    // });

// data.getCityByName("Sofia")
    // .then(city => {
        // console.log(city);
    // })
    // .catch(err => {
        // console.log(err);
        // data.createCity(Sofia);
    // });

//End of country tes