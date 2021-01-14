const Category = require('../models/EstabServiceCategory.model')
const EstablishmentService = require('../models/EstablishmentService.model')
var express = require('express');
var router = express.Router();
const mongoose = require ('mongoose');
// Create and Save a new contact
exports.create = (req, res , next) => {
    //if ( !req.body.name && !req.body.icon) {
       // return res.status(400).send({
         //   message: "champs can not be empty"
        //});
    //}
    console.log(req.file);
    const categorie = new Category({
       // _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        //icon: req.file.path
    });

    // Save HotelChain in the database
    categorie.save()
        .then(data => {
            console.log(data);

            res.status(201).json({
                message: " created categorie." ,
                CreatedCateg: {
                    name: data.name,
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
    Category.find().populate('_services')
    .then(category => {
        res.send(category);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Metas."
        });
    });
  };


exports.findAll = (req, res) => {
    Category.find().populate('_services')
        .then(category => {
            res.send(category);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Metas."
        });
    });
};

  exports.findOne = (req, res) => {
    Category.findById(req.params.id)
    .then(Category => {
        if(!Category) {
            return res.status(404).send({
                message: " categorie found with id " + req.params.id
            });            
        }
        res.send(Category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving categorie with id " + req.params.id
        });
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "categorie content can not be empty"
        });
    }

    // Find note and update it with the request body
    Category.findByIdAndUpdate(req.params.id, {
      
        name: req.body.name ,
        icon: req.body.req
    }, {new: true})
    .then(Category => {
        if(!Category) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.id
            });
        }
        res.send(Category);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating categorie with id " + req.params.id
        });
    });
};

exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
    .then(Category => {
        if(!Category) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.id
            });
        }
        res.send({message: "categorie deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "formule not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete categorie with id " + req.params.id
        });
    });
  };
 exports.newServiceCategorie = async (req, res , next) => {
    const { id } = req.params;
    const NewService = new EstablishmentService(req.body);
    console.log ( 'NewService', NewService);
    const category = await Category.findById(id);
    NewService._category =category ;
    await NewService.save();
    category._services.push(NewService);
    await category.save();
    res.status(201).json (NewService);
    //Category.findById(req.params.id).then(category => {
      //  NewService._category = category,
      // NewService.save().then(data => {
        //     category._services.push(data),
          //   category.save().then(data => {
            //          res.send(NewService);
               //    }).catch(err => {
                 // res.status(500).send({
                   //   message: err.message || "Some error occurred while saving destination"
                     //   });
                  //});
         //   }).catch(err => {
           //   res.status(500).send({
             //      message: err.message || "Some error occurred while creating a new Adress."
              //});

          //}).catch(err => {
           //     res.status(500).send({
         //       message: err.message || "Some error occurred while searching a destination"
       //  });
     //  })
 //})
}

exports.ServiceCategorie = async (req, res) => {
    
 //  Category.findById(req.params.id).then(category => {
   //     EstablishmentService.findById(req.params.id)
     //   .then(establishmentservice => {
       //     res.send(establishmentservice);
        //}).catch(err => {
          //  res.status(500).send({
            //    message: err.message || "Some error occurred while retrieving Metas."
            //});
        //});
    //})
    const {id} = req.params;
    const category =  await Category.findById(id) ;
    console.log('category' , category);
    res.status(201).json (category);
    
} 
