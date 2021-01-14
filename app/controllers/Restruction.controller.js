
const RestructionCtrl ={}
var Restruction = require('../models/EstabRestruction.model')

// Create and Save a new Restruction
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Restruction name can not be empty"
        });
    }

    // Create a Restruction
    const restruction = new Restruction({
        name: req.body.name || "Unnamed Restruction", 
        icon: req.body.icon,
        
    });

    // Save Restruction in the database
    restruction.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Restruction."
        });
    });
};

// Retrieve and return all Restructions from the database.
exports.findAll = (req, res) => {
    Restruction.find()
    .then(Restructions => {
        res.send(Restructions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Restructions."
        });
    });
};

// Find a single Restruction with a RestructionId
exports.findOne = (req, res) => {
    Restruction.findById(req.params.id)
    .then(Restruction => {
        if(!Restruction) {
            return res.status(404).send({
                message: " Restruction found with id " + req.params.id
            });            
        }
        res.send(Restruction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Restruction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Restruction with id " + req.params.id
        });
    });
};
// Update a Restruction identified by the RestructionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Restruction content can not be empty"
        });
    }

    // Find Restruction and update it with the request body
    Restruction.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Unnamed Restruction", 
        icon: req.body.icon,
        
    }, {new: true})
    .then(Restruction => {
        if(!Restruction) {
            return res.status(404).send({
                message: "Restruction not found with id " + req.params.id
            });
        }
        res.send(Restruction);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Restruction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Restruction with id " + req.params.id
        });
    });
};
// Delete a Restruction with the specified RestructionId in the request
exports.delete = (req, res) => {
    Restruction.findByIdAndRemove(req.params.id)
    .then(Restruction => {
        if(!Restruction) {
            return res.status(404).send({
                message: "Restruction not found with id " + req.params.id
            });
        }
        res.send({message: "Restruction deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Restruction not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Restruction with id " + req.params.id
        });
    });
};