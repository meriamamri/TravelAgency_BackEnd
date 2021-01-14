const Destination = require('../models/Destination.model')
const Country = require('../models/Country.model')
const Adress = require('../models/HotelAdress.model')

// Create and Save a new Destination
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Destination name can not be empty"
        });
    }

    // Create a Destination
    const destination = new Destination({
        name: req.body.name, 
        _country: req.Country._id,
    });

    // Save Destination in the database
    destination.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Destination."
        });
    });
};

// Retrieve and return all Destinations from the database.
exports.findAll = (req, res) => {
    Destination.find()
    .then(Destinations => {
        res.send(Destinations);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Destinations."
        });
    });
};

// Find a single Destination with a DestinationId
exports.findOne = (req, res) => {
    Destination.findById(req.params.id)
    .then(Destination => {
        if(!Destination) {
            return res.status(404).send({
                message: " destination found with id " + req.params.id
            });            
        }
        res.send(Destination);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "destination not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving destination with id " + req.params.id
        });
    });
};
// Update a Destination identified by the DestinationId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Destination content can not be empty"
        });
    }

    // Find Destination and update it with the request body
    Destination.findByIdAndUpdate(req.params.id, {
        name: req.body.name, 

    }, {new: true})
    .then(Destination => {
        if(!Destination) {
            return res.status(404).send({
                message: "Destination not found with id " + req.params.id
            });
        }
        res.send(Destination);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Destination not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating destination with id " + req.params.id
        });
    });
};
// Delete a Destination with the specified DestinationId in the request
exports.delete = (req, res) => {
    Destination.findByIdAndRemove(req.params.id)
    .then(Destination => {
        if(!Destination) {
            return res.status(404).send({
                message: "Destination not found with id " + req.params.id
            });
        }
        res.send({message: "Destination deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Destination not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Destination with id " + req.params.id
        });
    });
};

exports.findByCountryId = (req, res) => {
    Destination.find({ _country : req.params.id })
    .exec(function (err, destinations) {
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "Destinations not found with given Country Id " + req.params.id
          });                
        }
        return res.status(500).send({
          message: "Error retrieving Destinations with given Country Id " + req.params.id
        });
      }
            
      res.send(destinations);
    });
}
//add adress to city //one many
exports.newDestinationAdress = (req, res) => {
    const adres= new HotelAdress({
        adress:req.body.adress,
        postalCode:req.body.postalCode,
        dCity:req.body.dCity,
        dNearlyT:req.body.dNearlyT,
    });
    Destination.findById(req.body.cityId).then(dest => {
        adres._city=dest,
            adres.save().then(data => {
                dest._hotelAdress.push(data),
                    dest.save().then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving destination"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Adress."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a destination"
                });
            })
    })
}