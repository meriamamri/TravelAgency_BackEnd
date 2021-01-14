var Rate = require('../models/RateType.model');


exports.Create = async (req, res) => {
    const rate = new Rate({
        name: req.body.name,
        priceType: req.body.priceType,
        automatique: req.body.automatique,
        showType: req.body.showType,
        minStay: req.body.minStay,
        nbPostShow: req.body.nbPostShow,
        _roomType: req.body._roomType,
        _concellationPolicy: req.body._concellationPolicy,
        _formuleRepas: req.body._formuleRepas,
        _formuleBoisson: req.body._formuleBoisson,
        _product: req.body._product
    });
    // Save Rate-Type in the database
    await rate.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Rate-Type."
            });
        });
};


exports.findAllRoomRateTypes = async (req, res) => {
    await Rate.find({_roomType: req.params.id})

        .exec((err, rateType) => {
            if (!rateType) return res.status(400).send('Rate Type not found.');
            res.send(rateType);
        });
};

exports.findAllRateTypesOfRooms = async (req, res) => {
    await Rate.find({_product: req.params.id})

        .exec((err, rateType) => {
            if (!rateType) return res.status(400).send('Rate Type not found.');
            res.send(rateType);
        });
};

exports.findOne = async (req, res) => {
    await Rate.findById(req.params.id)
        .then(Rate => {
            if (!Rate) {
                return res.status(404).send({
                    message: "  Rate found with id " + req.params.id
                });
            }
            res.send(Rate);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " Rate not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Rate with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    Rate.findByIdAndRemove(req.params.id)
        .then(Rate => {
            if (!Rate) {
                return res.status(404).send({
                    message: "Rate not found with id " + req.params.id
                });
            }
            res.send({message: "Rate deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Rate not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete Rate with id " + req.params.id
        });
    });
};

exports.updateRateTape = async (req, res) => {
    await Rate.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        priceType: req.body.priceType,
        automatique: req.body.automatique,
        showType: req.body.showType,
        minStay: req.body.minStay,
        nbPostShow: req.body.nbPostShow,
        _roomType: req.body._roomType,
        _concellationPolicy: req.body._concellationPolicy,
        _formuleRepas: req.body._formuleRepas,
        _formuleBoisson: req.body._formuleBoisson
    }, {new: true})
        .then(Rate => {
            if (!Rate) {
                return res.status(404).send({
                    message: "Rate not found with id " + req.params.id
                });
            }
            res.send(Rate);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Rate not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Rate with id " + req.params.id
            });
        });
}