var Country = require('../models/Country.model.js')
var Destination = require('../models/Destination.model.js')
// Create and Save a new Country
exports.create = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    // Validate request
    if (!req.body.code && !req.body.psoCode && !req.body.name && !req.body.logo) {
        return res.status(400).send({
            message: "champs can not be empty"
        });
    }

    const country = new Country({
        code: req.body.code,
        psoCode: req.body.psoCode,
        name: req.body.name,
        logo: url + '/images/' + req.file.filename,

    });

    // Save country in the database
    country.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the country."
            });
        });
};

// Retrieve and return all countries from the database.
exports.findAll = (req, res) => {
    Country.find()
        .then(countries => {
            res.send(countries);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving countries."
            });
        });
};

// Find a single country with a country id
exports.findOne = (req, res) => {
    Country.findById(req.params.id)
        .then(country => {
            if (!country) {
                return res.status(404).send({
                    message: " country found with id " + req.params.id
                });
            }
            res.send(country);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving country with id " + req.params.id
            });
        });
};
// Update a country identified by the countryId in the request
exports.update = (req, res) => {
    const url = req.protocol + '://' + req.get('host');
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "country content can not be empty"
        });
    }

    // Find note and update it with the request body
    Country.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        psoCode: req.body.psoCode,
        name: req.body.name,
       // logo: url + '/images/' + req.file.filename,
    }, { new: true })
        .then(country => {
            if (!country) {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            }
            res.send(country);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating country with id " + req.params.id
            });
        });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Country.findByIdAndRemove(req.params.id)
        .then(country => {
            if (!country) {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            }
            res.send({ message: "country deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "country not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete country with id " + req.params.id
            });
        });
};
exports.newCountryCity = (req, res) => {
    const newDestination = new Destination(req.body);
    Country.findById(req.params.id).then(country => {
        newDestination._country = country,
            newDestination.save().then(data => {
                country._cities.push(data),
                    country.save().then(data => {
                        res.send(newDestination);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving country"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new destination."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a country"
                });
            })
    })
}

