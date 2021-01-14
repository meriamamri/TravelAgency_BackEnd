var HebergementType = require('../models/HebergementType.model.js')
var RatePromotionType = require('../models/RatePromotionType.model.js')
var RatePromotion = require('../models/RatePromotion.model')
var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose');

exports.create = (req, res) => {
    // Create a Establishment
    const ratepromo = new RatePromotion({
        minStay: req.body.minStay,
        unit: req.body.unit,
        reductionC : req.body.reductionC,
        from: req.body.from,
        to : req.body.to,
        applicationPromo: req.body.applicationPromo,
        name: req.body.name,
        _hebergement: req.body._hebergement,
        _rateType: req.body._rateType,
      //  _PromotionType: req.body._PromotionType
        // reservation anticipée
        avantj: req.body.avantj,
        // dernier minute
        condjourpreced : req.body.condjourpreced,
        condheurepreced: req.body.condheurepreced,
        jourpreced:req.body.jourpreced,
        heurepreced: req.body.heurepreced,
        datejour: req.body.datejour,
        datepromoearlybooking: req.bod


    });
    ratepromo.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Rate-Type."
        });
    });

};

exports.PromoType = async (req, res) => {

    const {id} = req.params;
    const ratepromotiontype =  await RatePromotionType.findById(id) ;
    console.log('ratepromotiontype' , ratepromotiontype);
    res.status(201).json (ratepromotiontype);

} 
