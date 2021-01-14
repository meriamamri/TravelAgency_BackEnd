const ConcCtrl = {};
var ConcellationPolicy = require('../models/ConcellationPolicy.model');

// Create and Save a new concellation policy
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({
            message: "concellation policy name can not be empty"
        });
    }

    // Create a Concellation policy
    const concellation = new ConcellationPolicy({
        name: req.body.name,
        period: req.body.period,
        amount: req.body.amount,
        pabsentAmount: req.body.pabsentAmount,
        typeConcellation: req.body.typeConcellation

    });

    // Save Concellation policy in the database
    concellation.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Concellation policy ."
            });
        });
};

exports.findAll = async(req, res) => {
   await ConcellationPolicy.find()
        .then(concellation => {
            res.send(concellation);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving concellation policy."
            });
        });
};


exports.findOne = (req, res) => {
    ConcellationPolicy.findById(req.params.id)
        .then(ConcellationPolicy => {
            if (!ConcellationPolicy) {
                return res.status(404).send({
                    message: " concellation policy found with id " + req.params.id
                });
            }
            res.send(ConcellationPolicy);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "concellation policy not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving concellation policy with id " + req.params.id
            });
        });
};

exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "name concellation can not be empty"
        });
    }

    // Find note and update it with the request body
    ConcellationPolicy.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        period: req.body.period,
        amount: req.body.amount,
        pabsentAmount: req.body.pabsentAmount,
        typeConcellation: req.body.typeConcellation

    }, { new: true })
        .then(ConcellationPolicy => {
            if (!ConcellationPolicy) {
                return res.status(404).send({
                    message: "concellation policy not found with id " + req.params.id
                });
            }
            res.send(ConcellationPolicy);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Concellation Policy not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Concellation Policy with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    ConcellationPolicy.findByIdAndRemove(req.params.id)
        .then(ConcellationPolicy => {
            if (!ConcellationPolicy) {
                return res.status(404).send({
                    message: "Concellation Policy not found with id " + req.params.id
                });
            }
            res.send({ message: "Concellation Policy deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Concellation Policy not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Concellation Policy with id " + req.params.id
            });
        });
};