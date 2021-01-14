
const LanguageCtrl ={}
var Language = require('../models/Language.model')

// Create and Save a new Language
exports.create = (req, res) => {
    // Validate request
    if(!req.body.code) {
        return res.status(400).send({
            message: "Language code can not be empty"
        });
    }

    // Create a Language
    const language = new Language({
        code: req.body.code || "Uncoded Language",
        name: req.body.name,
        logo: req.body.logo
    });

    // Save Language in the database
    language.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Language."
        });
    });
};

// Retrieve and return all Languages from the database.
exports.findAll = (req, res) => {
    Language.find()
    .then(Languages => {
        res.send(Languages);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Languages."
        });
    });
};

// Find a single Language with a LanguageId
exports.findOne = (req, res) => {
    Language.findById(req.params.id)
    .then(Language => {
        if(!Language) {
            return res.status(404).send({
                message: " Language found with id " + req.params.id
            });            
        }
        res.send(Language);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Language not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Language with id " + req.params.id
        });
    });
};
// Update a Language identified by the LanguageId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.code) {
        return res.status(400).send({
            message: "Language code can not be empty"
        });
    }

    // Find Language and update it with the request body
    Language.findByIdAndUpdate(req.params.id, {
        code: req.body.code || "Uncoded Language",
        name: req.body.name,
        logo: req.body.logo
    }, {new: true})
    .then(Language => {
        if(!Language) {
            return res.status(404).send({
                message: "Language not found with id " + req.params.id
            });
        }
        res.send(Language);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Language not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Language with id " + req.params.id
        });
    });
};
// Delete a Language with the specified LanguageId in the request
exports.delete = (req, res) => {
    Language.findByIdAndRemove(req.params.id)
    .then(Language => {
        if(!Language) {
            return res.status(404).send({
                message: "Language not found with id " + req.params.id
            });
        }
        res.send({message: "Language deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.code === 'NotFound') {
            return res.status(404).send({
                message: "Language not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Language with id " + req.params.id
        });
    });
};