let EstablishmentType = require('../models/EstablishmentType.model');
// Create and Save a new Note
exports.create = (req, res , next) => {

    const Type = new EstablishmentType({
        // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        code: req.body.code
    });

    // Save HotelChain in the database
    Type.save()
        .then(data => {
            console.log(data);

            res.status(201).json({
                message: " created categorie." ,
                CreatedCateg: {
                    name: data.name,code: data.code
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

exports.findAll = (req, res) => {
    EstablishmentType.find()
        .then(types => {
            res.send(types);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Metas."
        });
    });
};
//exports.findAll = (req, res) => {
//EstablishmentType.find((err, docs) => {
//  if(!err){res.send(docs);}
//else {console.log('err in retriving types:' +JSON.stringify(err,undefined,2));}
//});
//.then(types => {
//  res.send(types);
// }).catch(err => {
//res.status(500).send({
//  message: err.message || "Some error occurred while retrieving Metas."
//   });
//  });
//};

// Find a single note with a noteId
//exports.findOne = (req, res) => {
//EstablishmentType.findById(req.params.id)
// .then(EstablishmentType => {
//  if(!EstablishmentType) {
//    return res.status(404).send({
//      message: " type found with id " + req.params.id
// });
//}
//   res.send(EstablishmentType);
// }).catch(err => {
// if(err.kind === 'ObjectId') {
//   return res.status(404).send({
//     message: "type not found with id " + req.params.id
//});
//}
//return res.status(500).send({
//    message: "Error retrieving type with id " + req.params.id
//  });
//});
//};
exports.findOne = (req, res) => {
    //Validate Request
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`no record with given id: ${req.params.id}`);
    // console.log(req.params.id);

    EstablishmentType.findById(req.params.id,(err , doc) => {
        if (!err) { res.send(doc);}
        //   else {
        //     console.log('Error in EstabType update :'+JSON.stringify(err, undefined ,2));
        // }
    });
    // Find note and update it with the request body
    // HebergementType.findByIdAndUpdate(req.params.id, {
    //  name: req.body.name
    //}, {new: true})
    //.then(hebergementtype => {
    //  if(!hebergementtype) {
    //  return res.status(404).send({
    //      message: "Hebergement not found with id " + req.params.id
    // });
    // }
    // res.send(hebergementtype);
    //}).catch(err => {
    //  if(err.kind === 'ObjectId') {
    //   // return res.status(404).send({
    // message: "Hebergement not found with id " + req.params.id
    // });
    // }
    //return res.status(500).send({
    //  message: "Error updating meta with id " + req.params.id
    //});
// });
};

//exports.create = function (req , res , next) {
//  var type = new EstablishmentType(
//    {
//   code: req.body.code,
//     name: req.body.name
//   }
//);

//type.save((err , doc) => {
//  if (!err) {
//    res.send(res.send(doc));
//}
//})
//};
//exports.update = (req, res) => {
//Validate Request
//if(!ObjectId.isValid(req.params.id))
//     return res.status(400).send(`no record with given id: ${req.params.id}`);
// console.log(req.params.id);

//var EstabType = {
//  code: req.body.code,
//name: req.body.name,
// };
//EstablishmentType.findByIdAndUpdate(req.params.id, {$set: EstabType} , {new:true } , (err , doc) => {
//if (!err) { res.send(doc);}
//  else {
//    console.log('Error in EstabType update :'+JSON.stringify(err, undefined ,2));
//}
//});
// Find note and update it with the request body
// HebergementType.findByIdAndUpdate(req.params.id, {
//  name: req.body.name
//}, {new: true})
//.then(hebergementtype => {
//  if(!hebergementtype) {
//  return res.status(404).send({
//      message: "Hebergement not found with id " + req.params.id
// });
// }
// res.send(hebergementtype);
//}).catch(err => {
//  if(err.kind === 'ObjectId') {
//   // return res.status(404).send({
// message: "Hebergement not found with id " + req.params.id
// });
// }
//return res.status(500).send({
//  message: "Error updating meta with id " + req.params.id
//});
// });
//};
// Update a note identified by the noteId in the request
exports.update =  (req, res) => {
    //  Validate Request
    // if( !req.body.code || !req.body.name) {
    //   return res.status(400).send({
    //    message: "type content can not be empty"
    //    });
// }
    // Find note and update it with the request body
    EstablishmentType.findByIdAndUpdate(req.params.id, {
        code: req.body.code ,
        name: req.body.name,

    }, {new: true})
        .then(EstabType => {
            if(!EstabType) {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            res.send(EstabType);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "type not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating type with id " + req.params.id
        });
    });
};
//exports.update = function (req, res) {
//if( !req.body.code || !req.body.name) {
//return res.status(400).send({
//    message: "type content can not be empty"
//   });
//    }
//EstablishmentType.findByIdAndUpdate(req.params.id, {$set: req.body},
//    function (err, type) {
//      if (err) return next(err);
//     res.send('establishment udpated.');
//  });
//};

exports.delete = (req, res) => {
    EstablishmentType.findByIdAndRemove(req.params.id)
        .then(EstablishmentType => {
            if(!EstablishmentType) {
                return res.status(404).send({
                    message: "type not found with id " + req.params.id
                });
            }
            res.send({message: "type deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Meta not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete type with id " + req.params.id
        });
    });
};