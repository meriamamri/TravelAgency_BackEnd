var Geoloaction = require('../models/Geolocation.model.js')

// Create and Save a new Geoloaction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.lat && !req.body.long) {
        return res.status(400).send({
            message: "latitude or langitude can not be empty"
        });
    }

    // Create a Geoloaction
    const geoloaction = new Geoloaction({
        lat: req.body.lat, 
        long:req.body.long, 
    });

    // Save Geoloaction in the database
    geoloaction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Geoloaction."
        });
    });
};

// Retrieve and return all Geoloactions from the database.
exports.findAll = (req, res) => {
    Geoloaction.find()
    .then(Geoloactions => {
        res.send(Geoloactions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Geoloactions."
        });
    });
};

// Find a single Geoloaction with a GeoloactionId
exports.findOne = (req, res) => {
    Geoloaction.findById(req.params.id)
    .then(Geoloaction => {
        if(!Geoloaction) {
            return res.status(404).send({
                message: " Geoloaction found with id " + req.params.id
            });            
        }
        res.send(Geoloaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Geoloaction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Geoloaction with id " + req.params.id
        });
    });
};
// Update a Geoloaction identified by the GeoloactionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.lat && !req.body.long) {
        return res.status(400).send({
            message: "latitude or langitude can not be empty"
        });
    }

    // Find Geoloaction and update it with the request body
    Geoloaction.findByIdAndUpdate(req.params.id, {
        lat: req.body.lat,
        long: req.body.long,
    }, {new: true})
    .then(Geoloaction => {
        if(!Geoloaction) {
            return res.status(404).send({
                message: "Geoloaction not found with id " + req.params.id
            });
        }
        res.send(Geoloaction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Geoloaction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Geoloaction with id " + req.params.id
        });
    });
};
// Delete a Geoloaction with the specified GeoloactionId in the request
exports.delete = (req, res) => {
    Geoloaction.findByIdAndRemove(req.params.id)
    .then(Geoloaction => {
        if(!Geoloaction) {
            return res.status(404).send({
                message: "Geoloaction not found with id " + req.params.id
            });
        }
        res.send({message: "Geoloaction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Geoloaction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Geoloaction with id " + req.params.id
        });
    });
};
