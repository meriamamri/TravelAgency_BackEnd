var RateDiscount = require('../models/RateDiscount.model');
var RateDiscountAd = require('../models/RateDiscountAd.model');
var RateDiscountCh = require('../models/RateDiscountCh.model');
var ApplicationDay = require('../models/ApplicationDay.model');

exports.AddDiscountCh = (req, res) => {
    const appDay = new ApplicationDay({
        mon: req.body._discountAppDay.mon,
        tue: req.body._discountAppDay.tue,
        wed: req.body._discountAppDay.wed,
        thu: req.body._discountAppDay.thu,
        fri: req.body._discountAppDay.fri,
        sat: req.body._discountAppDay.sat,
        sun: req.body._discountAppDay.sun
    });
    appDay.save().then(day => {
        const discountCh = new RateDiscountCh({
            minAge: req.body.minAge,
            maxAge: req.body.maxAge,
            _discountAppDay: day._id,
            _rateDiscount: req.body._rateDiscount,
            _roomType: req.body._roomType,
        });
        discountCh.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the discountCh"
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the app Day"
        });
    });
};
exports.AddDiscountAd = (req, res) => {
    const discountAd = new RateDiscountAd({
        troiDiscount: req.body.troiDiscount,
        quatDiscount: req.body.quatDiscount,
        _rateDiscount: req.body._rateDiscount,
        _roomType: req.body._roomType,
    });

    discountAd.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the discountAd"
            });
        });
};
exports.AddDiscount = (req, res) => {
    const discount = new RateDiscount({
        from: req.body.from,
        to: req.body.to,
        type: req.body.type,
        _roomOccupancy: req.body._roomOccupancy,
        _rateType: req.body._rateType,

    });

    discount.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the discount"
            });
        });
};
exports.UpdateDiscountCh = (req, res) => {
        RateDiscountCh.findByIdAndUpdate(req.params.id, {
            minAge: req.body.minAge,
            maxAge: req.body.maxAge,
            _rateDiscount: req.body._rateDiscount,
            _roomType: req.body._roomType,
        }, {new: true})
        .then(RedCh => {
            ApplicationDay.findByIdAndUpdate(RedCh._discountAppDay._id, {
                mon: req.body._discountAppDay.mon,
                tue: req.body._discountAppDay.tue,
                wed: req.body._discountAppDay.wed,
                thu: req.body._discountAppDay.thu,
                fri: req.body._discountAppDay.fri,
                sat: req.body._discountAppDay.sat,
                sun: req.body._discountAppDay.sun
            }, {new: true}).then().catch(err => {
                if(err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "day not found with id " + req.params.id
                    });                
                }
                return res.status(500).send({
                    message: "Error updating Red Ch with id " + req.params.id
                });
            });
            if(!RedCh) {
                return res.status(404).send({
                    message: "Red ch not found with id " + req.params.id
                });
            }
            res.send(RedCh);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Red Ch not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating Red Ch with id " + req.params.id
            });
        });
};
exports.UpdateDiscountAd = (req, res) => {
    RateDiscountAd.findByIdAndUpdate(req.params.id, {
        troiDiscount: req.body.troiDiscount,
        quatDiscount: req.body.quatDiscount,
        _rateDiscount: req.body._rateDiscount,
        _roomType: req.body._roomType,
    }, {new: true})
    .then(Red => {
        if(!Red) {
            return res.status(404).send({
                message: "red ad not found with id " + req.params.id
            });
        }
        res.send(Red);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Red ad not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Red ad with id " + req.params.id
        });
    });

   
};
exports.UpdateDiscount = (req, res) => {
    RateDiscount.findByIdAndUpdate(req.params.id, {
        from: req.body.from,
        to: req.body.to,
        type: req.body.type,
        _roomOccupancy: req.body._roomOccupancy,
        _rateType: req.body._rateType,

    }, {new: true})
    .then(Red => {
        if(!Red) {
            return res.status(404).send({
                message: "red not found with id " + req.params.id
            });
        }
        res.send(Red);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Red not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Red with id " + req.params.id
        });
    });
};
exports.findAllDiscountCh = (req, res) => {
    RateDiscountCh.find({ _roomType: req.params.id })
        .populate({ path: '_rateDiscount', populate: { path: '_roomOccupancy' } })
        .populate({ path: '_rateDiscount', populate: { path: '_rateType' } })
        .populate('_discountAppDay')
        .exec((err, discount) => {
            if (!discount) return res.status(400).send('discoutn not found.');
            res.send(discount);
        });
};
exports.getDiscountCh = async (req, res) => {
    await RateDiscountCh.findById(req.params.id)
    .populate({ path: '_rateDiscount', populate: { path: '_roomOccupancy' } })
    .populate({ path: '_rateDiscount', populate: { path: '_rateType' } })
    .populate('_discountAppDay')
        .then(ch => {
            if (!ch) {
                return res.status(404).send({
                    message: "  Reduction ch found with id " + req.params.id
                });
            }
            res.send(ch);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " Reduction chnot found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Rate with id " + req.params.id
            });
        });
};
exports.getDiscountAd = async (req, res) => {
    await RateDiscountAd.findById(req.params.id)
    .populate({ path: '_rateDiscount', populate: { path: '_roomOccupancy' } })
    .populate({ path: '_rateDiscount', populate: { path: '_rateType' } })
        .then(ad => {
            if (!ad) {
                return res.status(404).send({
                    message: "  Reduction ch found with id " + req.params.id
                });
            }
            res.send(ad);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " Reduction chnot found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Rate with id " + req.params.id
            });
        });
};

exports.findAllDiscountAd = (req, res) => {
    RateDiscountAd.find({ _roomType: req.params.id })
    .populate({ path: '_rateDiscount', populate: { path: '_roomOccupancy' } })
    .populate({ path: '_rateDiscount', populate: { path: '_rateType' } })
        .exec((err, discount) => {
            if (!discount) return res.status(400).send('discoutn not found.');
            res.send(discount);
        });
};
exports.deleteAd = (req, res) => {
    RateDiscountAd.findByIdAndRemove(req.params.id)
        .then(discount => {
            if (!discount) {
                return res.status(404).send({
                    message: "discount not found with id " + req.params.id
                });
            }
            RateDiscount.findByIdAndRemove(discount._rateDiscount._id)
                .then(d => {
                    res.send({ message: "discount deleted successfully!" })
                }).catch(err => {
                    if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                        return res.status(404).send({
                            message: " discount not found with id " + req.params.id
                        });
                    }
                    return res.status(500).send({
                        message: "Could not delete discount with id " + req.params.id
                    });

                });

        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: " discount not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete discount with id " + req.params.id
            });
        });
};

exports.deleteCh = (req, res) => {
    RateDiscountCh.findByIdAndRemove(req.params.id)
        .then(discount => {
            RateDiscount.findByIdAndRemove(discount._rateDiscount._id)
            .then({} ).catch(err => {
                return res.status(500).send({
                    message: "Could not delete discount with id " + req.params.id
                });

            })
            ApplicationDay.findByIdAndRemove(discount._discountAppDay._id)
            .then({} ).catch(err => {
                return res.status(500).send({
                    message: "Could not delete app day with id " + req.params.id
                });

            })
 
                    
                        res.send({ message: "discount ch deleted successfully!" })

               

        }).catch(err => {

            return res.status(500).send({
                message: "Could not delete discount ch with id " + req.params.id
            });
        });
};
