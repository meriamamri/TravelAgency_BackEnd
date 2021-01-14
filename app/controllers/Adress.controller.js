var Adress = require('../models/HotelAdress.model.js')

// Create and Save a new adress
exports.create = (req, res) => {
    // Validate request
    if(!req.body.adress) {
        return res.status(400).send({
            message: "adress can not be empty"
        });
    }

    // Create a adress
    const adress = new Adress({
        adress: req.body.adress,
        postalCode: req.body.postalCode, 
       // city: req.destination._id,
    });

    // Save adress in the database
    adress.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the adress."
        });
    });
};

// Retrieve and return all adresss from the database.
exports.findAll = (req, res) => {
    Adress.find()
    .then(adresss => {
        res.send(adresss);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving adresss."
        });
    });
};

// Find a single adress with a adressId
exports.findOne = (req, res) => {
    Adress.findById(req.params.id)
    .then(adress => {
        if(!adress) {
            return res.status(404).send({
                message: " adress found with id " + req.params.id
            });            
        }
        res.send(adress);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "adress not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving adress with id " + req.params.id
        });
    });
};
// Update a adress identified by the adressId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.adress) {
        return res.status(400).send({
            message: "adress content can not be empty"
        });
    }

    // Find adress and update it with the request body
    Adress.findByIdAndUpdate(req.params.id, {
        adress: req.body.adress,
        postalCode: req.body.postalCode, 
    }, {new: true})
    .then(adress => {
        if(!adress) {
            return res.status(404).send({
                message: "adress not found with id " + req.params.id
            });
        }
        res.send(adress);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "adress not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating adress with id " + req.params.id
        });
    });
};
// Delete a adress with the specified adressId in the request
exports.delete = (req, res) => {
    Adress.findByIdAndRemove(req.params.id)
    .then(adress => {
        if(!adress) {
            return res.status(404).send({
                message: "adress not found with id " + req.params.id
            });
        }
        res.send({message: "adress deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "adress not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete adress with id " + req.params.id
        });
    });
};
exports.findByDestinationId = (req, res) => {
    adress.find({ destination : req.params.destinationId })
    .exec(function (err, adresss) {
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "adresss not found with given Country Id " + req.params.destinationId
          });                
        }
        return res.status(500).send({
          message: "Error retrieving adresss with given Country Id " + req.params.destinationId
        });
      }
            
      res.send(adresss);
    });
  };