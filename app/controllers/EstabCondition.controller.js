
var Condition = require('../models/EstabCondition.model')
var Description = require('../models/Description.model')

// Create and Save a new Condition
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Condition title can not be empty"
        });
    }

    // Create a Condition
    const condition = new Condition({
        title: req.body.title || "Untitled Condition",
        nbjour: req.body.nbjour,
        establishment: req.body.establishment,
    });

    // Save Condition in the database
    condition.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Condition."
        });
    });
};

// Retrieve and return all Conditions from the database.
exports.findAll = (req, res) => {
    Condition.find()
    .then(Conditions => {
        res.send(Conditions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Conditions."
        });
    });
};

// Find a single Condition with a ConditionId
exports.findOne = (req, res) => {
    Condition.findById(req.params.id)
    .then(Condition => {
        if(!Condition) {
            return res.status(404).send({
                message: " Condition found with id " + req.params.id
            });            
        }
        res.send(Condition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Condition not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Condition with id " + req.params.id
        });
    });
};

// condition update a Condition identified by the ConditionId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.title) {
        return res.status(400).send({
            message: "Condition title can not be empty"
        });
    }

    // Find Condition and condition update it with the request body
    Condition.findByIdAndUpdate(req.params.id, {
        title: req.body.title || "Untitled Condition"
    
    }, {new: true})
    .then(Condition => {
        if(!Condition) {
            return res.status(404).send({
                message: "Condition not found with id " + req.params.id
            });
        }
        res.send(Condition);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Condition not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error condition updating Condition with id " + req.params.id
        });
    });
};
// Delete a Condition with the specified ConditionId in the request
exports.delete = (req, res) => {
    Condition.findByIdAndRemove(req.params.id)
    .then(Condition => {
        if(!Condition) {
            return res.status(404).send({
                message: "Condition not found with id " + req.params.id
            });
        }
        res.send({message: "Condition deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.title === 'NotFound') {
            return res.status(404).send({
                message: "Condition not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Condition with id " + req.params.id
        });
    });
};

// Find all contacts by EstabId
exports.findDescriptionsByConditionId = (req, res) => {
    Description.find({ estabCondition : req.params.condId })
    .exec(function (err, descriptions) {
      if (err){
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
            message: "descriptions not found with given Establishment Id " + req.params.condId
          });                
        }
        return res.status(500).send({
          message: "Error retrieving descriptions with given Establishment Id " + req.params.condId
        });
      }
      res.send(descriptions);
    });
  };
