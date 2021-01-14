var HebergementType = require('../models/HebergementType.model');

/************** Add type productFacility ******************/
exports.createHebergementType = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Hebergement Type name can not be empty"
        });
    }
    const hebergementType = new HebergementType({
        name: req.body.name
    });

    await hebergementType.save()
        .then(type => {
            res.send(type);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type of hebergement ."
            });
        });
};

/**************  Retrieve and return all types from the database.************/
exports.findAllTypes = async (req, res) => {
    await HebergementType.find().exec((err, hebergementType) => {
        if (!hebergementType) return res.status(400).send('Types not found.');
        res.send(hebergementType);
    });
};

/************** Find a single type with a typeId ************/
exports.findOne = (req, res) => {
    console.log(req.params.id);
    HebergementType.findById(req.params.id)
        .then(hebergementType => {
            if (!hebergementType) {
                return res.status(404).send({
                    message: " HebergementType found with id " + req.params.id
                });
            }
            res.send(hebergementType);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "HebergementType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error retrieving hebergementType with id " + req.params.id
        });
    });
};

/************* Update a type identified by the typeId in the request ************/
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "HebergementType content can not be empty"
        });
    }

    // Find note and update it with the request body
    HebergementType.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true})
        .then(hebergementType => {
            if (!hebergementType) {
                return res.status(404).send({
                    message: "HebergementType not found with id " + req.params.id
                });
            }
            res.send(hebergementType);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "HebergementType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating hebergementType with id " + req.params.id
        });
    });
};

/************* Delete a type with the specified typeId in the request************/
exports.delete = (req, res) => {
    HebergementType.findByIdAndRemove(req.params.id)
        .then(hebergementType => {
            if (!hebergementType) {
                return res.status(404).send({
                    message: "HebergementType not found with id " + req.params.id
                });
            }
            res.send({message: "HebergementType deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "HebergementType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete hebergementType with id " + req.params.id
        });
    });
};

