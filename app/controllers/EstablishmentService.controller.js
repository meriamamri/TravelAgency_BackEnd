const EstablishmentService = require('../models/EstablishmentService.model')
const EstablishmentType = require('../models/EstablishmentType.model')
const EstablishmentCategory = require('../models/EstabServiceCategory.model')
// Create and Save a new contact
exports.create = (req, res) => {
    // Create a Establishment
    const EstabService = new EstablishmentService({
        name: req.body.name,
        _category: req.body._category
    });
    EstabService.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Rate-Type."
        });
    });

};

exports.findOneService = (req, res) => {
    EstablishmentCategory.findById(req.params.id)
    .populate('_services')   
       .then (EstablishmentCategory => {
           if( !EstablishmentCategory) {
               return res.status(404).send({
                   message: " service found with id " + req.params.id
               });            
           }
           res.send (EstablishmentCategory);
       }).catch(err => {
           if(err.kind === 'ObjectId') {
               return res.status(404).send({
                   message:  "service  not found with id " + req.params.id
               });                
           }
           return res.status(500).send({
               message: "Error retrieving service with id " + req.params.id
           });
       });
   };
exports.findAll = (req, res) => {
    EstablishmentService.find()
  .then(types => {
      res.send(types);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Metas."
      });
  });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    EstablishmentService.findById(req.params.id)
  .then(EstablishmentService => {
      if(!EstablishmentType) {
          return res.status(404).send({
              message: " type found with id " + req.params.id
          });            
      }
      res.send(EstablishmentService);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "type not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving type with id " + req.params.id
      });
  });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
  EstablishmentService.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      _category: req.body._category
  }, {new: true})
  .then(EstablishmentService => {
      if(!EstablishmentService) {
          return res.status(404).send({
              message: "Meta not found with id " + req.params.id
          });
      }
      res.send(EstablishmentService);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Meta not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Error updating meta with id " + req.params.id
      });
  });
};

exports.delete = (req, res) => {
    EstablishmentService.findByIdAndRemove(req.params.id)
  .then(EstablishmentService => {
      if(!EstablishmentService) {
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
 // add new service to category 
 exports.newServiceCategorie = (req, res) => {
    const NewService = new EstablishmentService(req.body);
     Category.findById(req.params.id).then(category => {
        NewService._category = category,
        NewService.save().then(data => {
                category._services.push(data),
                category.save().then(data => {
                        res.send(NewService);
                    }).catch(err => {
                       res.status(500).send({
                    message: err.message || "Some error occurred while saving destination"
                        });
                    });
             }).catch(err => {
               res.status(500).send({
                    message: err.message || "Some error occurred while creating a new Adress."
               });
 
            }).catch(err => {
                res.status(500).send({
                message: err.message || "Some error occurred while searching a destination"
               });
        })
    })
 }
 
 



