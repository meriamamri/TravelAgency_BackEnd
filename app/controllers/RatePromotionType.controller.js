var RatePromotionType = require('../models/RatePromotionType.model.js')
var RatePromotion = require('../models/RatePromotion.model');
// creation de promotype
exports.create = async (req, res) => {
    if (!req.body.name && !req.body.description) {
        return res.status(400).send({
            message: "Promo Type can not be empty"
        });
    }
    const RatePromoType = new RatePromotionType({
        name: req.body.name ,
        description: req.body.description
    });
    await RatePromoType.save()
        .then(type => {
            res.send(type);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type of product facility ."
            });
        });
};
exports.findAll = (req, res) => {
    RatePromotionType.find()
        .then(RatePromotionType => {
            res.send(RatePromotionType);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving RatePromotionType ."
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
    RatePromotionType.findByIdAndUpdate(req.params.id, {

        name: req.body.name,
        description: req.body.description

    }, {new: true})
        .then(RatePromotionType => {
            if(!RatePromotionType) {
                return res.status(404).send({
                    message: "RatePromotionType not found with id " + req.params.id
                });
            }
            res.send(RatePromotionType);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RatePromotionType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating RatePromotionType with id " + req.params.id
        });
    });
};
exports.delete = (req, res) => {
    RatePromotionType.findByIdAndRemove(req.params.id)
        .then(RatePromotionType => {
            if(!RatePromotionType) {
                return res.status(404).send({
                    message: "RatePromotionType not found with id " + req.params.id
                });
            }
            res.send({message: "RatePromotionType deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "RatePromotionType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete RatePromotionType with id " + req.params.id
        });
    });
};

