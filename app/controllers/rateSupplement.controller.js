var RateSupplement= require('../models/RateSupplement.model');
var ApplicationDay = require('../models/ApplicationDay.model');

exports.AddSupplement = (req, res) => {
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
        const supp= new RateSupplement({
            code: req.body.code,
            name: req.body.name,
            from: req.body.from,
            to: req.body.to,
            type: req.body.type,
            priceType: req.body.priceType,
            minAge: req.body.minAge,
            maxAge: req.body.maxAge,
            unit: req.body.unit,
            price: req.body.price,
            _appDay:appDay._id,
            _roomOccupancy: req.body._roomOccupancy,
            _rateType:req.body._rateType,
            _roomType: req.body._roomType,
        });
        supp.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Suplement"
                });
            });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the app Day"
        });
    });
};

exports.UpdateSupplement = (req, res) => {
        RateSupplement.findByIdAndUpdate(req.params.id, {
            code: req.body.code,
            name: req.body.name,
            from: req.body.from,
            to: req.body.to,
            type: req.body.type,
            priceType: req.body.priceType,
            minAge: req.body.minAge,
            maxAge: req.body.maxAge,
            unit: req.body.unit,
            price: req.body.price,
            _roomOccupancy: req.body._rateDiscount,
            _rateType:req.body._rateType,
            _roomType: req.body._roomType,
        }, {new: true})
        .then(supp => {
            ApplicationDay.findByIdAndUpdate(supp._discountAppDay._id, {
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
                    message: "Error updating App day with id " + req.params.id
                });
            });
            if(!supp) {
                return res.status(404).send({
                    message: "Supplement not found with id " + req.params.id
                });
            }
            res.send(supp);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Supplemnt not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating Supplemt with id " + req.params.id
            });
        });
};

exports.findAllRateSupplement = (req, res) => {
    RateSupplement.find({ _roomType: req.params.id })
        .populate([{path:'_roomOccupancy'},{path:'_rateType'},{path:'appDay'}])
        .exec((err, supp) => {
            if (!supp) {return res.status(400).send('discou tn not found.');}
            res.send(supp);
        });
};
exports.getRateSupplement = async (req, res) => {
    await RateDSupplement.findById(req.params.id)
    .populate([{path:'_roomOccupancy'},{path:'_rateType'},{path:'appDay'}])
       
        .then(supp => {
            if (!supp) {
                return res.status(404).send({
                    message: "  Supplement not found with id " + req.params.id
                });
            }
            res.send(supp);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: " supplement hnot found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Rate with id " + req.params.id
            });
        });
};


exports.delete = (req, res) => {
    RateSupplement.findByIdAndRemove(req.params.id)
        .then(supp=> {
            ApplicationDay.findByIdAndRemove(supp._discountAppDay._id)
            .then({} ).catch(err => {
                return res.status(500).send({
                    message: "Could not delete app day with id " + req.params.id
                });

            })
 
                    
                        res.send({ message: "Supplement deleted successfully!" })

               

        }).catch(err => {

            return res.status(500).send({
                message: "Could not delete Supplement with id " + req.params.id
            });
        });
};
