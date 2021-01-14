var Establishment = require('../models/Establishment.model')
var MetaInfo = require('../models/MetaInfo.model')
var Restruction = require('../models/EstabRestruction.model')
var Geolocation = require('../models/Geolocation.model')
var Contact = require('../models/HotelContact.model')
var HotelAdress = require('../models/HotelAdress.model')
var Service = require('../models/EstablishmentService.model')
var HotelAdress = require('../models/HotelAdress.model')
var PayCard = require('../models/PayementCard.model')
var SocialConnection = require('../models/SocialConnection.model')
var Destination = require('../models/Destination.model')
var EstablishmentType = require('../models/EstablishmentType.model')
var HotelChain = require('../models/HotelChain.model')
var Cancellation = require('../models/EstabCancellation.model')


// Create and Save a new Establishment
exports.create = (req, res) => {

    // Create a Establishment
    const establishment = new Establishment({
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        webSite: req.body.webSite,
        stars: req.body.stars,
        ageBB: req.body.ageBB,
        ageEnfant: req.body.ageEnfant,
        urlAdvisor: req.body.urlAdvisor,
        recomanded: req.body.recomanded,
        aCompte: req.body.aCompte,
        status: req.body.status,
        onLignePay: req.body.onLignePay
    });
    EstablishmentType.findById(req.body.estabTypeId).then(type => {
        establishment._typeEstab = type;
        HotelChain.findById(req.body.hotelChainId).then(chain => {
            establishment._hotelChain = chain;
            establishment.save()
                .then(data => {
                    res.send(data);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Establishment."
                    });
                });

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching hotailChain"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while searching  estab type."
        });
    });
    // Save Establishment in the database

};


// Retrieve and return all Establishments from the database.
exports.findAll = (req, res) => {
    Establishment.find()
        .then(Establishments => {
            res.send(Establishments);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Establishments."
            });
        });
};

// Find a single Establishment with a EstablishmentId
exports.findOne = (req, res) => {
    Establishment.findById(req.params.id)
        .populate('_contacts')
        .populate('_metaInfo')
        .populate('hotelChain')
        .populate('typeEstab')
        .populate('_conditions')
        .populate('_restructions')
        .populate('_geolocation')

        .then(Establishment => {
            if (!Establishment) {
                return res.status(404).send({
                    message: " Establishment found with id " + req.params.id
                });
            }
            res.send(Establishment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving Establishment with id " + req.params.id
            });
        });
};

// Update a Establishment identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    /* if(!req.body.Code) {
         return res.status(400).send({
             message:  "Establishment code can not be empty"
         });
     }*/

    // Find Establishment and update it with the request body
    Establishment.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name,
        description: req.body.description,
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        fax: req.body.fax,
        webSite: req.body.webSite,
        stars: req.body.stars,
        ageBB: req.body.ageBB,
        ageEnfant: req.body.ageEnfant,
        urlAdvisor: req.body.urlAdvisor,
        recomanded: req.body.recomanded,
        aCompte: req.body.aCompte,
        status: req.body.status,
        onLignePay: req.body.onLignePay,
        nameArabe: req.body.nameArabe,
        descriptionArabe: req.body.descriptionArabe,
        _typeEstab: req.body.typeEstab,
        _hotelChain: req.body.hotelChain,
        _restructions: req.body.restructions,
    }, { new: true })
        .then(Establishment => {
            if (!Establishment) {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            res.send(Establishment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Establishment with id " + req.params.id
            });
        });
};
// Delete a Establishment with the specified id in the request
exports.delete = (req, res) => {
    Establishment.findByIdAndRemove(req.params.id)
        .then(Establishment => {
            if (!Establishment) {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            //Delete all contacts of this Estab
            let arrayContact = Establishment._contacts;
            console.log(arrayContact);
            arrayContact.every(function (contact) {
                Contact.findByIdAndRemove(contact).then(res => {
                    console.log("ok");
                }).catch(err => {
                    return res.status(500).send({
                        message: "Could not delete contacts with establishment id " + req.params.id
                    });
                });
                return true;
            });
            //Delete all cancellation policy of this Estab
            let arrayCondition = Establishment._conditions;
            console.log(arrayCondition);
            arrayCondition.every(function (condition) {
                Cancellation.findByIdAndRemove(condition).then(res => {
                    console.log("ok");
                }).catch(err => {
                    return res.status(500).send({
                        message: "Could not delete conditions with establishment id " + req.params.id
                    });
                });
                return true;
            });
            //delete metaInfo of this estab
            var idMeta = Establishment._metaInfo;
            MetaInfo.findByIdAndRemove(idMeta)
                .then(meta => {
                    if (!meta) {
                        return res.status(404).send({
                            message: "meta not found with id " + idMeta
                        });
                    }
                }).catch(err => {
                    return res.send({
                        message: err
                    });
                });

            res.send({ message: "Establishment deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: " Establishment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Establishment with id " + req.params.id
            });
        });
};

//Translation Arabe
exports.translationAr = (req, res) => {
    Establishment.findByIdAndUpdate(req.params.id, {
        nameArabe: req.body.nameArabe,
        descriptionArabe: req.body.descriptionArabe
    }, { new: true })
        .then(Establishment => {
            if (!Establishment) {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            res.send(Establishment);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Establishment not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating Establishment with id " + req.params.id
            });
        });
};


// Find all contacts by EstabId
exports.findContactsByEstabId = (req, res) => {
    Contact.find({ establishment: req.params.estabId })
        .exec(function (err, contacts) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Contacts not found with given Establishment Id " + req.params.estabId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Contacts with given Establishment Id " + req.params.estabId
                });
            }

            res.send(contacts);
        });
};

// Find all contacts by EstabId
exports.findConditionsByEstabId = (req, res) => {
    Condition.find({ establishment: req.params.estabId })
        .exec(function (err, conditions) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "conditions not found with given Establishment Id " + req.params.estabId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving conditions with given Establishment Id " + req.params.estabId
                });
            }

            res.send(conditions);
        });
};
//add metaInfo to establishment one one 
exports.newEstabMetaInfo = (req, res) => {
    const newGeo = new MetaInfo({
        title: req.body.title,
        description: req.body.description,
        keyword: req.body.keyword
    });
    Establishment.findById(req.params.id).then(estab => {
        newGeo.save().then(data => {
            estab._metaInfo = data,
                estab.save().then(data => {
                    res.send(newGeo);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while saving estab"
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new meta info."
            });

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching a estab"
            });
        })
    })
};

exports.newEstabAdress = (req, res) => {

    Establishment.findById(req.params.id).then(estab => {
        const adres = new HotelAdress({
            adress: req.body.adress,
            postalCode: req.body.postalCode,
            dCity: req.body.dCity,
            dNearlyT: req.body.dNearlyT,
            _city:req.body.cityId
        });
                adres.save().then(data => {
                            estab._adress = data,
                            estab.save().then(d => {
                                res.send(d);
                            }).catch(err => {
                                res.status(500).send({
                                    message: err.message || "Some error occurred while saving estab"
                                });
                            });
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while save adress estab"
                    });
                })
               
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while search estab"
        });
    });

};

// add geolocation to estab // one one one estab has one geo
exports.newEstabGeolocation = (req, res) => {
    const newGeo = new Geolocation({
        long: req.body.long,
        lat: req.body.lat
    });
    Establishment.findById(req.params.id).then(estab => {
        newGeo.save().then(data => {
            estab._geolocation = data,
                estab.save().then(data => {
                    res.send(newGeo);
                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while saving estab"
                    });
                });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new geolocation."
            });

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching a estab"
            });
        })
    })
};
// add restruction to estab // many many
exports.newEstabrestruction = (req, res) => {
    Restruction.findById(req.body._id).then(restruction => {
        Establishment.findById(req.params.id).then(estab => {
            restruction._establishments.push(estab),
                estab._restructions.push(restruction),
                restruction.save().then(
                    estab.save().then(
                        data => {
                            res.send(data);
                        }
                    ).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    })
                ).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while adding restruction"
                    });
                })

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching a Establishment"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while searching a restruction"
        });

    })
}
// add service to estab // many to many
exports.newEstabService = (req, res) => {
    Service.findById(req.body._id).then(service => {
        Establishment.findById(req.params.id).then(estab => {
            service._hotels.push(estab),
                estab._services.push(service),
                service.save().then(
                    estab.save().then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    })
                ).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while adding service"
                    });
                })

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching a Establishment"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while searching a service"
        });

    })
}
// add payCard to estab // many to many many estab to many service
exports.newEstabPayMethod = (req, res) => {
    PayCard.findById(req.body._id).then(card => {
        Establishment.findById(req.params.id).then(estab => {
            card._establishments.push(estab),
                estab._paymentCards.push(card),
                card.save().then(
                    estab.save().then(data => {
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    })
                ).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while adding card Payment"
                    });
                })

        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while searching a Establishment"
            });
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while searching a card Payment"
        });

    })
}
// add contact to estab // one to many one estab many contacts

exports.newEstabContact = (req, res) => {
    const newContact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        job: req.body.job,
        _establishment:req.body.establishment
    });
Establishment.findById(req.params.id).then(estab => {
        newContact.save().then(data => {
            estab._contacts.push(data),
                    estab.save().then(d => {
                        res.send(d);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Contact."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a Contact"
                });
            })
    })

}
// add social connection lin youtube insta.. to estab
exports.newEstabSocialConnection = (req, res) => {


    const newSocialCon = new SocialConnection({
        link: req.body.link,
        type: req.body.type,
        associated: req.body.associated,
    });
    Establishment.findById(req.params.id).then(estab => {
        newSocialCon._hotel = estab,
            newSocialCon.save().then(data => {
                estab._socialConnections.push(data),
                    estab.save().then(d => {
                        res.send(d);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Contact."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a Contact"
                });
            })
    })

}
//add image to estab
exports.newEstabImage = (req, res) => {


    const img = new Image({
        url: req.body.url,
        description: req.body.description,
        width: req.body.width,
        heigth: req.body.heigth,
    });
    Establishment.findById(req.params.id).then(estab => {
        img._establishment = estab,
            img.save().then(data => {
                estab._images.push(data),
                    estab.save().then(d => {
                        res.send(d);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Contact."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a Contact"
                });
            })
    })

}
// add condition to estab // one to many one estab many conditions
exports.newEstabCondition = (req, res) => {
    const newCondition = new Cancellation({
        name: req.body.name,
        period: req.body.period,
        amount: req.body.amount,
        absentAmount: req.body.absentAmount,
        typeCancellation: req.body.typeCancellation
    });
    Establishment.findById(req.params.id).then(estab => {
        newCondition._establishment = estab,
            newCondition.save().then(data => {
                estab._conditions.push(data),
                    estab.save().then(d => {
                        res.send(d);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving estab"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Condition."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching a Condition"
                });
            })
    })
}




