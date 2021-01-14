var RoomType = require('../models/RoomType.model');
var Description = require('../models/Description.model');
var RoomOccupancy = require('../models/RoomOccupancy.model');

/************** Add type productFacility ******************/
exports.createRoomType = (req, res) => {

    if (!req.body._product) {
        return res.status(400).send({
            message: "product can not be empty"
        });
    }

    if (!req.body._hebergementType) {
        return res.status(400).send({
            message: "Hebergement type can not be empty"
        });
    }

    RoomType.findOne({code: req.body.code}, function (err, result) {
        if (result) res.status(400).send('Code "' + req.body.code + '" is already taken');
    });


    const roomType = new RoomType({
        code: req.body.code,
        name: req.body.name,
        photo: req.body.photo,
        nbRoom: req.body.nbRoom,
        minStay: req.body.minStay,
        maxOccup: req.body.maxOccup,
        priceLitBB: req.body.priceLitBB,
        numberLitBB: req.body.numberLitBB,
        largeBed: req.body.largeBed,
        singleBed: req.body.singleBed,
        size: req.body.size,
        nbExtraBed: req.body.nbExtraBed,
        _product: req.body._product,
        _hebergementType: req.body._hebergementType
    });

    const description = new Description(
        {
            content: req.body.content,
        });

    roomType.save()
        .then(roomtype => {
            // save description
            description._roomType = roomtype;
            description.save()
                .then(description => {
                    RoomType.findOne({"_id": roomtype._id}, function (err, result) {
                        if (!err && result) {
                            result._descriptions.push(description._id); // update ur values goes here
                            var nvRoomType = new RoomType(result);
                            nvRoomType.save();
                            res.send(nvRoomType);
                        } else console.log(err);
                    });
                })
                .catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while updating the description of the roomType ."
                    });
                });

        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the description of the roomType ."
            });
        });

};

/**************  Retrieve and return all room types from the database by Id product.************/
exports.findAllRoomTypesByProductID = (req, res) => {
    RoomType.find({_product: req.params.id})
        .populate("_descriptions")
        .exec((err, roomType) => {
            if (!roomType) return res.status(400).send('Room Type not found.');
            res.send(roomType);
        });
};

/**************  Retrieve and return a room type by Id from the database .************/
exports.findRoomTypeByID = (req, res) => {
    RoomType.findOne({_id: req.params.id})
        .populate("_descriptions")
        .populate("_equipements")
        .exec((err, roomType) => {
            if (!roomType) return res.status(400).send('Room Type not found.');
            res.send(roomType);
        });
};

/************* Update a room type identified by the Id in the request ************/
exports.update = (req, res) => {

    if (!req.body._product) {
        return res.status(400).send({
            message: "product can not be empty"
        });
    }

    if (!req.body._hebergementType) {
        return res.status(400).send({
            message: "Hebergement type can not be empty"
        });
    }

    // Find room type and update it with the request body
    RoomType.findByIdAndUpdate(req.params.id, {
        code: req.body.code,
        name: req.body.name,
        photo: req.body.photo,
        nbRoom: req.body.nbRoom,
        minStay: req.body.minStay,
        maxOccup: req.body.maxOccup,
        priceLitBB: req.body.priceLitBB,
        numberLitBB: req.body.numberLitBB,
        largeBed: req.body.largeBed,
        singleBed: req.body.singleBed,
        size: req.body.size,
        nbExtraBed: req.body.nbExtraBed,
        //maxChild: req.body.maxChild,
        //maxAdult: req.body.maxAdult,
        _product: req.body._product,
        _hebergementType: req.body._hebergementType
    }, {new: true})
        .then(roomType => {
            if (!roomType) {
                return res.status(404).send({
                    message: "Room type not found with id " + req.params.id
                });
            }

            Description.findOne({"_roomType": req.params.id}, function (err, result) {
                if (!err && result) {
                    result.content = req.body.content;
                    var nvDescription = new Description(result);
                    nvDescription.save();
                } else console.log(err);
                res.send(roomType);
            });
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RoomType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating roomType with id " + req.params.id
        });
    });
};

/************* Delete a room type with the specified Id in the request************/
exports.delete = (req, res) => {
    RoomType.findByIdAndRemove(req.params.id)
        .then(roomType => {
            if (!roomType) {
                return res.status(404).send({
                    message: "RoomType not found with id " + req.params.id
                });
            }
            let arrayDescrip = roomType._descriptions;
            console.log(arrayDescrip);
            arrayDescrip.every(function (descrip) {
                Description.findByIdAndRemove(descrip).then(res => {
                    console.log("ok");
                }).catch(err => {
                    return res.status(500).send({
                        message: "Could not delete descriptions with room type id " + req.params.id
                    });
                });
                return true;
            });
            res.send({message: "RoomType deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "RoomType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete roomType with id " + req.params.id
        });
    });
};

/************************ Add Product facility to a room type *********************/
exports.addFacilities = (req, res) => {
    console.log(req.body);
    if (!req.body._equipements) {
        return res.status(400).send({
            message: "Product facilities can not be empty"
        });
    }

    RoomType.findByIdAndUpdate(req.params.id, {
        _equipements: req.body._equipements
    }, {new: true})
        .then(roomType => {
            if (!roomType) {
                return res.status(404).send({
                    message: "Room type not found with id " + req.params.id
                });
            }
            res.send(roomType);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "RoomType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating roomType with id " + req.params.id
        });
    });
};

/************************ add occupancy to roomType  *********************/
exports.newRoomTypeOccupancy = (req, res) => {
    const newOccupancy = new RoomOccupancy({

        nbAd: req.body.nbAd,
        nbCh: req.body.nbCh,
        status: req.body.status
    });
    RoomType.findById(req.params.id).then(roomtype => {
        newOccupancy._roomtype = roomtype,
            newOccupancy.save().then(data => {
                roomtype._occupancies.push(data),
                    roomtype.save().then(d => {
                        res.send(d);
                    }).catch(err => {
                        res.status(500).send({
                            message: err.message || "Some error occurred while saving roomtype"
                        });
                    });
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Occupancy."
                });

            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while searching an Occupancy"
                });
            })
    })
}


/********************* get all occupancies of a roomtype******************/
exports.findAllOccupancy = (req, res) => {
    RoomOccupancy.find({roomtype: req.params.id})
        .exec(function (err, occupancies) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Occupancies not found with given RoomTypeId Id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving Contacts with given RoomTypeId Id " + id
                });
            }

            res.send(occupancies);
        });
};