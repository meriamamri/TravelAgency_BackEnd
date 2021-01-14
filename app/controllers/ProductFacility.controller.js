var ProductFacility = require('../models/ProductFacility.model');
var ProductFacilityType = require('../models/ProductFacilityType.model');

// Create and Save a new Note
exports.create = (req, res) => {
    // Create a Establishment
    const prod = new ProductFacility({
        name: req.body.name,
        _type: req.body._type
    });
    prod.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Rate-Type."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    ProductFacility.find()
        .then(ProductsFacility => {
            res.send(ProductsFacility);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Product."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    ProductFacility.findById(req.params.id)
        .then(ProductFacility => {
            if (!ProductFacility) {
                return res.status(404).send({
                    message: " ProductFacility found with id " + req.params.id
                });
            }
            res.send(ProductFacility);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "ProductFacility not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving ProductFacility with id " + req.params.id
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    ProductFacility.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        _type: req.body._type
    }, {new: true})
        .then(ProductFacility => {
            if(!ProductFacility) {
                return res.status(404).send({
                    message: "Product Facility not found with id " + req.params.id
                });
            }
            res.send(ProductFacility);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product Facility not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating Product Facility with id " + req.params.id
        });
    });
};


// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    ProductFacility.findByIdAndRemove(req.params.id)
        .then(ProductFacility => {
            if (!ProductFacility) {
                return res.status(404).send({
                    message: "ProductFacility not found with id " + req.params.id
                });
            }
            res.send({message: "ProductFacility deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ProductFacility not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete ProductFacility with id " + req.params.id
        });
    });
};

exports.findOneFacility = (req, res) => {
    ProductFacilityType.findById(req.params.id)
    .populate('_facilities')   
       .then (ProductFacilityType => {
           if( !ProductFacilityType) {
               return res.status(404).send({
                   message: " Product Facility found with id " + req.params.id
               });            
           }
           res.send (ProductFacilityType);
       }).catch(err => {
           if(err.kind === 'ObjectId') {
               return res.status(404).send({
                   message:  "Product Facility not found with id " + req.params.id
               });                
           }
           return res.status(500).send({
               message: "Error retrieving Product Facility with id " + req.params.id
           });
       });
   };