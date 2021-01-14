const BoissonCtrl ={}
var Boisson = require('../models/FormuleBoisson.model')

// Create and Save a new Boisson
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Boisson name can not be empty"
        });
    }

    // Create a boisson
    const boisson = new Boisson({
        code: req.body.code , 
        name: req.body.name 
       
    });

    // Save Meta in the database
    boisson.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the  Boisson."
        });
    });
};
exports.findAll = (req, res) => {
    Boisson.find()
    .then(boisson => {
        res.send(boisson);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving  Boissons."
        });
    });
  };

  exports.findOne = (req, res) => {
    Boisson.findById(req.params.id)
    .then(Boisson => {
        if(!Boisson) {
            return res.status(404).send({
                message: "  Boisson found with id " + req.params.id
            });            
        }
        res.send(Boisson);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: " Boisson not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving repas with id " + req.params.id
        });
    });
  };
  // Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: " Boisson content can not be empty"
        });
    }

    // Find note and update it with the request body
    Boisson.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name 
       
    }, {new: true})
    .then(Boisson => {
        if(!Boisson) {
            return res.status(404).send({
                message: " Boisson not found with id " + req.params.id
            });
        }
        res.send(Boisson);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "boisson not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating boisson with id " + req.params.id
        });
    });
};
exports.delete = (req, res) => {
    Boisson.findByIdAndRemove(req.params.id)
    .then(Boisson => {
        if(!Boisson) {
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