
var Meta = require('../models/MetaInfo.model')

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Meta title can not be empty"
        });
    }

    // Create a Note
    const meta = new Meta({
        title: req.body.title || "Untitled Meta", 
        description: req.body.description,
        keyword: req.body.keyword
    });

    // Save Meta in the database
    meta.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Meta."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Meta.find()
    .then(metas => {
        res.send(metas);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Metas."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Meta.findById(req.params.id)
    .then(Meta => {
        if(!Meta) {
            return res.status(404).send({
                message: " meta found with id " + req.params.id
            });            
        }
        res.send(Meta);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "meta not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving meta with id " + req.params.id
        });
    });
};
// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Meta content can not be empty"
        });
    }

    // Find note and update it with the request body
    Meta.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Meta",
        description: req.body.description,
        keyword: req.body.keyword
    }, {new: true})
    .then(Meta => {
        if(!Meta) {
            return res.status(404).send({
                message: "Meta not found with id " + req.params.id
            });
        }
        res.send(Meta);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Meta not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating meta with id " + req.params.id
        });
    });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Meta.findByIdAndRemove(req.params.id)
    .then(Meta => {
        if(!Meta) {
            return res.status(404).send({
                message: "Meta not found with id " + req.params.id
            });
        }
        res.send({message: "Meta deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Meta not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Meta with id " + req.params.id
        });
    });
};