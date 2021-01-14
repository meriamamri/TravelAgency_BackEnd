var Establishment = require('../models/Establishment.model.js')
// Create and Save a new HotelChain
var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose');
var HotelChain = require('../models/HotelChain.model')

exports.create = (req, res , next) => {
   
    const hotelChain = new HotelChain({
        code: req.body.code,
        name: req.body.name,
        logo: req.body.logo
    });

    // Save HotelChain in the database
    hotelChain.save()
        .then(data => {
            console.log(data);

            res.status(201).json({
                message: " created HotelChain." ,
                CreatedProduct: {
                    code: data.code,
                    name: data.name,
                    logo: data.logo,

                    request:{
                        type: 'Get' ,
                        url: "http://localhost:3000/chaines/"
                    }
                }

            });
        })
        .catch ( err => {
            console.log (err) ;
            res.status(500).json({
                error: err
            });
        });

};

exports.getAll = (req, res) => {
    HotelChain.find()
        .then(countries => {
            res.send(countries);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving countries."
            });
        });
};

// Retrieve and return all countries from the database.
//exports.findAll = (req, res , next) => {
   // HotelChain.find()
   //     .select("code name logo ")
     //   .exec()
       // .then (docs => {
         //   const response = {
           //     count: docs.length,
             //   hotelchaines:  docs.map(doc =>{
               //     return {
                 //       code: doc.code,
                   //     name: doc.name,
                     //   logo: doc.logo ,
                       // request:{
                         //   type: "GET",
                           // url: " http://localhost:3000/chaines"
                //        }
              //      } ;
                //})

           // } ;
            //res.status(200).json(response);
        //})
        //.catch(err => {
          //  console.log(err);
        //    res.status(500).json({
      //          error: err
    //        });
  //      });
//};

exports.findAll = (req, res) => {
    HotelChain.find()
        .then(chains => {
            res.send(chains);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving chains."
        });
    });
};

// Find a single HotelChain with a HotelChain id
exports.findOne = (req, res) => {
    HotelChain.findById(req.params.id)
        .then(HotelChain => {
            if (!HotelChain) {
                return res.status(404).send({
                    message: " HotelChain found with id " + req.params.id
                });
            }
            res.send(HotelChain);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "HotelChain not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving HotelChain with id " + req.params.id
            });
        });
};
// Update a HotelChain identified by the HotelChainId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "HotelChain content can not be empty"
        });
    }

    // Find note and update it with the request body
    HotelChain.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name,
        logo: rl + '/images/' + req.file.filename,
    }, { new: true })
        .then(HotelChain => {
            if (!HotelChain) {
                return res.status(404).send({
                    message: "HotelChain not found with id " + req.params.id
                });
            }
            res.send(HotelChain);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "HotelChain not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating HotelChain with id " + req.params.id
            });
        });
};
// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    HotelChain.findByIdAndRemove(req.params.id)
        .then(HotelChain => {
            if (!HotelChain) {
                return res.status(404).send({
                    message: "HotelChain not found with id " + req.params.id
                });
            }
            res.send({ message: "HotelChain deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "HotelChain not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete HotelChain with id " + req.params.id
            });
        });
};
exports.newHotelChainHotel = (req, res) => {
    const newHotel = new Establishment(req.body);
    HotelChain.findById(req.params.id).then(hotelChain => {
        newHotel._hotelChain = hotelChain,
            newEstablishment.save().then(data => {
                hotelChain._hotels.push(data),
                    hotelChain.save().then(data => {
                        res.send(newHotel);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving HotelChain"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Establishment."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a HotelChain"
                });
            })
    })
}

