var RateMargin = require('../models/RateMargin.model');
//var ApplicationDay = require('../models/ApplicationDay.model');


exports.create = (req, res) => {
    const margin = new RateMargin({
        from: req.body.from,
        to: req.body.to,
        marge1: req.body.marge1,
        marge2: req.body.marge2,
        unit: req.body.unit,
        _marginApplicationDay:req.body._marginApplicationDay,
        unitMonetaire: req.body.unitMonetaire,
        _rateType: req.body._rateDiscount,
        _roomOccupancy: req.body._roomOccupancy

    });

    margin.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the margin"
        });
    });
};

exports.findAllMarge = (req, res) => {
    RateMargin.find()
    // {_roomType: req.params.id}
        .then(marge => {
            res.send(marge);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving  Boissons."
        });
    });
    //   .exec((err, marge) => {
    //       if (!marge) return res.status(400).send('marge not found.');
    //     res.send(marge);
    //});
};
