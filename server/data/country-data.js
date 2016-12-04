module.exports = function (models) {
    const { Country } = models;

    return {
        createCountry(countryObj) {
            return new Promise((resolve, reject) => {
                console.log("CREATING/UPDATING COUNTRY...");
                Country.findOne({ name: countryObj.name }, function (err, country) {
                    if (!err) {
                        if (!country) {
                            country = Country.getCountry(countryObj);
                        } else {
                            country.description = countryObj.description;
                            country.pictureUrl = countryObj.pictureUrl;
                            country.countryUrl = countryObj.countryUrl;
                            country.city = countryObj.city;
                        }
                        country.save(function (err) {
                            if (err) {
                                console.log("CANNOT CREATE COUNTRY");
                                return reject(err);
                            }
                            console.log("COUNTRY CREATED!");
                            return resolve(country);
                        });
                    }
                });
            });
        },
        createCountry__(countryInfo) {

            return new Promise((resolve, reject) => {

                console.log("CREATING COUNTRY...");

                Country.create(countryInfo, (err, country) => {
                    if (err) {

                        console.log("CANNOT CREATE COUNTRY");
                        return reject(err);
                    }

                    console.log("COUNTRY CREATED!");
                    return resolve(country);
                });
            });
        },
        getCountryById(countryId) {
            return new Promise((resolve, reject) => {

                console.log(`SEARCHING FOR COUNTRY WITH ID:${countryId}`);

                Country.findOne({ _id: countryId }, (err, country) => {
                    if (err) {
                        console.log("ERROR WHILE CONNECTING TO THE SERVER");
                        return reject(err);
                    }

                    if (!country) {
                        console.log(`COUNTRY WITH ${countryId} WAS NOT FOUND`);
                        return reject(countryId);
                    }

                    console.log(`COUNTRY WITH ${countryId} WAS FOUND`);
                    return resolve(country);
                });
            });
        },
        getCountryByName(countryName) {
            return new Promise((resolve, reject) => {

                console.log(`SEARCHING FOR COUNTRY WITH NAME:${countryName}`);

                Country.findOne({ name: countryName }, (err, country) => {
                    if (err) {
                        console.log("ERROR WHILE CONNECTING TO THE SERVER");
                        return reject(err);
                    }

                    if (!country) {
                        console.log(`COUNTRY WITH ${countryName} WAS NOT FOUND`);
                        return reject(countryName);
                    }

                    console.log(`COUNTRY WITH ${countryName} WAS FOUND`);
                    return resolve(country);
                });
            });
        },
        getAllCountries_() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL COUNTRIES...");
                Country.find({}, (err, countries) => {
                    if (err) {
                        console.log("ERROR WHEN GETTING ALL COUNTRIES!");
                        return reject(err);
                    }

                    console.log("COUNTRIES FOUND!");
                    return resolve(countries);
                });
            });
        },
        getAllCountries(countryProps) { //FIX in an object, specify which properties to return
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL COUNTRIES...");
                Country.find({}, countryProps, { sort: { name: +1 } }, (err, countries) => { //was 'name'
                    if (err) {
                        console.log("ERROR WHEN GETTING ALL COUNTRIES!");
                        return reject(err);
                    }

                    console.log("COUNTRIES FOUND!");
                    // console.log(countries);
                    return resolve(countries);
                });
            });
        },
        getCountryList(mask, countryProps) { //FIX in an object, specify which properties to return
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL COUNTRIES...MASK");
                let re = new RegExp(mask, 'i');
                Country.find({ name: { $regex: re } }, countryProps, { sort: { name: +1 } }, (err, countries) => { //was 'name'
                    if (err) {
                        console.log("ERROR WHEN GETTING ALL COUNTRIES MASK!");
                        return reject(err);
                    }

                    console.log("COUNTRIES FOUND MASK!");
                    // console.log(countries);
                    return resolve(countries);
                });
            });
        },
        getCountryDescriptionById(id, countryProps) {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL COUNTRIES...");
                Country.findOne({ _id: id }, countryProps, (err, country) => {
                    if (err) {
                        console.log("ERROR WHEN GETTING ALL COUNTRIES!");
                        return reject(err);
                    }

                    console.log("COUNTRIES FOUND!");
                    return resolve(country);
                });
            });
        }
    };
};