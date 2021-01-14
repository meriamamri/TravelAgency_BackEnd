
var RoomOccupancy = require('../models/RoomOccupancy.model')

// Create and Save a new occupancy
exports.create = (req, res) => {
    // Validate request
    if(!req.body.nbAd) {
        return res.status(400).send({
            message: "nbAd can not be empty"
        });
    }

    // Create occupancy
    const occupancy = new RoomOccupancy({
        nbAd: req.body.nbAd, 
        nbCh: req.body.nbCh,
        status: req.body.status,
        roomtype: req.body.roomtype,
    });

    // Save occupancy in the database
    occupancy.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the occupancy."
        });
    });
};

// Retrieve and return all occupancies from the database.
exports.findAll = (req, res) => {
    RoomOccupancy.find()
    .then(occupancies => {
        res.send(occupancies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving occupancies."
        });
    });
};

// Find a single occupancy with a noteId
exports.findOne = (req, res) => {
    RoomOccupancy.findById(req.params.id)
    .then(RoomOccupancy => {
        if(!RoomOccupancy) {
            return res.status(404).send({
                message: " RoomOccupancy found with id " + req.params.id
            });            
        }
        res.send(RoomOccupancy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RoomOccupancy not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving RoomOccupancy with id " + req.params.id
        });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Find note and update it with the request body
    RoomOccupancy.findByIdAndUpdate(req.params.id, {
        status: req.body.status,
    }, {new: true})
    .then(RoomOccupancy => {
        if(!RoomOccupancy) {
            return res.status(404).send({
                message: "RoomOccupancy not found with id " + req.params.id
            });
        }
        res.send(RoomOccupancy);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RoomOccupancy not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating RoomOccupancy with id " + req.params.id
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    RoomOccupancy.findByIdAndRemove(req.params.id)
    .then(RoomOccupancy => {
        if(!RoomOccupancy) {
            return res.status(404).send({
                message: "RoomOccupancy not found with id " + req.params.id
            });
        }
        res.send({message: "RoomOccupancy deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "RoomOccupancy not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete RoomOccupancy with id " + req.params.id
        });
    });
};

exports.findAllRoomOccupancy = async (req, res) => {
    await RoomOccupancy.find({roomtype: req.params.idRoom})

        .exec((err, occ) => {
            if (!occ) return res.status(400).send('Ocuupancy not found.');
            res.send(occ);
        });
};