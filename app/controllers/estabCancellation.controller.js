
const CancellationCtrl ={}
var Cancellation = require('../models/EstabCancellation.model')

// Create and Save a new Cancellation
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Cancellation name can not be empty"
        });
    }

    // Create a Cancellation
    const cancellation = new Cancellation({
        name: req.body.name,
        period: req.body.period,
        amount: req.body.amount,
        absentAmount: req.body.absentAmount,
        typeCancellation: req.body.typeCancellation,
        establishment: req.body.establishment
    });
    
    // Save Cancellation in the database
    cancellation.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Cancellation."
        });
    });
};

// Retrieve and return all Cancellations from the database.
exports.findAll = (req, res) => {
    Cancellation.find()
    .then(Cancellations => {
        res.send(Cancellations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Cancellations."
        });
    });
};

// Find a single Cancellation with a CancellationId
exports.findOne = (req, res) => {
    Cancellation.findById(req.params.id)
    .then(Cancellation => {
        if(!Cancellation) {
            return res.status(404).send({
                message: " Cancellation found with id " + req.params.id
            });            
        }
        res.send(Cancellation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cancellation not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Cancellation with id " + req.params.id
        });
    });
};
// Update a Cancellation identified by the CancellationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Cancellation content can not be empty"
        });
    }

    // Find Cancellation and update it with the request body
    Cancellation.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        period: req.body.period,
        amount: req.body.amount,
        absentAmount: req.body.absentAmount,
        typeCancellation: req.body.typeCancellation
    }, {new: true})
    .then(Cancellation => {
        if(!Cancellation) {
            return res.status(404).send({
                message: "Cancellation not found with id " + req.params.id
            });
        }
        res.send(Cancellation);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cancellation not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Cancellation with id " + req.params.id
        });
    });
};
// Delete a Cancellation with the specified CancellationId in the request
exports.delete = (req, res) => {
    Cancellation.findByIdAndRemove(req.params.id)
    .then(Cancellation => {
        if(!Cancellation) {
            return res.status(404).send({
                message: "Cancellation not found with id " + req.params.id
            });
        }
        res.send({message: "Cancellation deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Cancellation not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Cancellation with id " + req.params.id
        });
    });
};