
var Description = require('../models/Description.model')
// Create and Save a new Description
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Description content can not be empty"
        });
    }

    // Create a Description
    const description = new Description({
        content: req.body.content || "Uncontentd Description",
        estabCondition: req.body.estabCondition
       
    });

    // Save Description in the database
    description.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Description."
        });
    });
};

// Retrieve and return all Descriptions from the database.
exports.findAll = (req, res) => {
    Description.find()
    .then(Descriptions => {
        res.send(Descriptions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Descriptions."
        });
    });
};

// Find a single Description with a DescriptionId
exports.findOne = (req, res) => {
    Description.findById(req.params.id)
    .populate('estabCondition')
    .then(Description => {
        if(!Description) {
            return res.status(404).send({
                message: " Description found with id " + req.params.id
            });            
        }
        res.send(Description);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Description not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Description with id " + req.params.id
        });
    });
};
// Update a Description identified by the DescriptionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Description content can not be empty"
        });
    }

    // Find Description and update it with the request body
    Description.findByIdAndUpdate(req.params.id, {
        content: req.body.content || "Uncontentd Description"
    
    }, {new: true})
    .then(Description => {
        if(!Description) {
            return res.status(404).send({
                message: "Description not found with id " + req.params.id
            });
        }
        res.send(Description);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Description not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Description with id " + req.params.id
        });
    });
};
// Delete a Description with the specified DescriptionId in the request
exports.delete = (req, res) => {
    Description.findByIdAndRemove(req.params.id)
    .then(Description => {
        if(!Description) {
            return res.status(404).send({
                message: "Description not found with id " + req.params.id
            });
        }
        res.send({message: "Description deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.content === 'NotFound') {
            return res.status(404).send({
                message: "Description not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Description with id " + req.params.id
        });
    });
};