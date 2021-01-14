var Rate = require('../models/Rate.model');
var Day = require('../models/ApplicationDay.model');

exports.create = async (req, res, next) => {

    const day = new Day({
        mon: req.body.mon,
        tue: req.body.tue,
        wed: req.body.wed,
        thu: req.body.thu,
        fri: req.body.fri,
        sat: req.body.sat,
        sun: req.body.sun 
    });

    const rate = new Rate({
        from: req.body.from,
        to: req.body.to,
        unity: req.body.unity,
        release: req.body.release,
        _rateType: req.body._rateType
    });
    day.save(function (err) {
        if (err) {
            return next(err);
        }
        rate._priceApplicationDay = day._id
        rate.save(function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).send('rate has been registred');
        });
    });
};

exports.findAllRate = async (req, res) => {
    await Rate.find({ _rateType: req.params.id }).populate('_priceApplicationDay')

        .exec((err, rate) => {
            if (!rate) return res.status(400).send('Rate Type not found.');
            res.send(rate);
        });
};

exports.update = (req, res) => {
    Rate.findByIdAndUpdate(req.params.id, {
        from: req.body.from,
        to: req.body.to,
        unity: req.body.unity,
        release: req.body.release,
        _rateType: req.body._rateType

    }, { new: true }).then(Dayup => {
        Day.findByIdAndUpdate(Dayup._priceApplicationDay._id, {
            mon: req.body.mon,
            tue: req.body.tue,
            wed: req.body.wed,
            thu: req.body.thu,
            fri: req.body.fri,
            sat: req.body.sat,
            sun: req.body.sun
        }, { new: true }).then().catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "day not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating day with id " + req.params.id
            });
        });
        if (!Dayup) {
            return res.status(404).send({
                message: "Red ch not found with id " + req.params.id
            });
        }
        res.send(Dayup);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Red Ch not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating Red Ch1 with id " + req.params.id + err
        });
    });
};

exports.getOneRate = async (req, res) => {
    await Rate.findById(req.params.id)
        .populate('_priceApplicationDay')
        .then(r => {
            if (!r) {
                return res.status(404).send({
                    message: "  Rate not found with id " + req.params.id
                });
            }
            console.log(r);
            res.send(r);
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
            Day.findByIdAndRemove(Rate._priceApplicationDay._id)
                .then(d => {
                    res.send({ message: "Days deleted successfully!" })
                }).catch(err => {
                    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                        return res.status(404).send({
                            message: " Days not found with id " + req.params.id
                        });
                    }
                    return res.status(500).send({
                        message: "Could not delete Days with id " + req.params.id
                    });
                });
            //res.send({ message: "Rate deleted successfully!" });
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