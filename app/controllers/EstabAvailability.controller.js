
var Availability = require('../models/EstabAvailability.model')

// Create and Save a new availability
exports.create = (req, res) => {
   
    // Create a availability
    const availability = new Availability({
        available: req.body.available
    });

    // Save Availability in the database
    availability.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Availability."
        });
    });
};

// Retrieve and return all availabilitys from the database.
exports.findAll = (req, res) => {
    Availability.find()
    .then(Availabilitys => {
        res.send(availabilitys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Availabilitys."
        });
    });
};

// Find a single availability with a availabilityId
exports.findOne = (req, res) => {
    Availability.findById(req.params.id)
    .then(Availability => {
        if(!Availability) {
            return res.status(404).send({
                message: " Availability found with id " + req.params.id
            });            
        }
        res.send(Availability);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Availability not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Availability with id " + req.params.id
        });
    });
};
// Update a availability identified by the availabilityId in the request
exports.update = (req, res) => {
    
    // Find availability and update it with the request body
    Availability.findByIdAndUpdate(req.params.id, {
        available: req.body.available
    }, {new: true})
    .then(Availability => {
        if(!Availability) {
            return res.status(404).send({
                message: "Availability not found with id " + req.params.id
            });
        }
        res.send(Availability);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Availability not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Availability with id " + req.params.id
        });
    });
};
// Delete a availability with the specified availabilityId in the request
exports.delete = (req, res) => {
    Availability.findByIdAndRemove(req.params.id)
    .then(Availability => {
        if(!Availability) {
            return res.status(404).send({
                message: "Availability not found with id " + req.params.id
            });
        }
        res.send({message: "Availability deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Availability not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Availability with id " + req.params.id
        });
    });
};