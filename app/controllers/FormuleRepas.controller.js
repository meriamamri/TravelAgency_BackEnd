const RepasCtrl ={}
var Repas = require('../models/FormuleRepas.model')

// Create and Save a new Meal
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Meal name can not be empty"
        });
    }

    // Create a Meal
    const repas = new Repas({
        code: req.body.code , 
        name: req.body.name 
       
    });

    // Save Meta in the database
    repas.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Meal formula."
        });
    });
};

exports.findAll = (req, res) => {
    Repas.find()
    .then(repas => {
        res.send(repas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Meal formula."
        });
    });
  };

  exports.findOne = (req, res) => {
    Repas.findById(req.params.id)
    .then(Repas => {
        if(!Repas) {
            return res.status(404).send({
                message: " Meal found with id " + req.params.id
            });            
        }
        res.send(Repas);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Meal not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Meal with id " + req.params.id
        });
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Meal content can not be empty"
        });
    }

    // Find note and update it with the request body
    Repas.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name 
       
    }, {new: true})
    .then(Repas => {
        if(!Repas) {
            return res.status(404).send({
                message: "Meal not found with id " + req.params.id
            });
        }
        res.send(Repas);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Meal not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Meal with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Repas.findByIdAndRemove(req.params.id)
    .then(Repas => {
        if(!Repas) {
            return res.status(404).send({
                message: "formule not found with id " + req.params.id
            });
        }
        res.send({message: "formule deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "formule not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete formule with id " + req.params.id
        });
    });
  };