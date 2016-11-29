module.exports = function (models) {
    const { Country } = models.models;

    return {
        createCountry(countryObj) {
            const country = Country.getCountry(countryObj);
            return new Promise((resolve, reject) => {
                country.save((err) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(country);
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
            })
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
            })
        },
        getAllCountries() {
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
        }
    };
}