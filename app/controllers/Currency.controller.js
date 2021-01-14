var Currency = require('../models/Currency.model')

exports.create = (req, res) => {
    // Validate request
    
        if( !req.body.symbol || !req.body.tarif || !req.body.name) {
        return res.status(400).send({
            message: "Currency title can not be empty"
        });
    }

    // Create a Note
    const currency = new Currency({
        name: req.body.name,
        symbol: req.body.symbol,
        tarif: req.body.tarif,
        active: req.body.active
    });

    currency.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Currency."
        });
    });
};

exports.findAll = (req, res) => {
    Currency.find()
    .then(currencys => {
        res.send(currencys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Currencys."
        });
    });
};


exports.findOne = (req, res) => {
    Currency.findById(req.params.id)
    .then(Currency => {
        if(!Currency) {
            return res.status(404).send({
                message: " Currency found with id " + req.params.id
            });            
        }
        res.send(Currency);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Currency with id " + req.params.id
        });
    });
};

exports.update = (req, res) => {


    Currency.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        symbol: req.body.symbol,
        tarif: req.body.tarif,
        active: req.body.active
    }, {new: true})
    .then(Currency => {
        if(!Currency) {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.id
            });
        }
        res.send(Currency);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Currency with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Currency.findByIdAndRemove(req.params.id)
    .then(Currency => {
        if(!Currency) {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.id
            });
        }
        res.send({message: "Currency deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Currency not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Currency with id " + req.params.id
        });
    });
};
