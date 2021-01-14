const PayementCard = require('../models/PayementCard.model')

exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "email or phone can not be empty"
        });
    }

    // Create a contact
    const payementcard = new PayementCard({
        name: req.body.name ,
        icon:req.body.icon
    });

    // Save Meta in the database
    payementcard.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Meta."
        });
    });
};

exports.findAll = (req,res) => {
     PayementCard.find()
     .then (payementcards =>{
      res.send (payementcards) ;  
     }).catch ( err=> {
        res.status(500).send({
            message : err.message || "some error "
        });
     });
};

  exports.findOne = (req, res) => {
    PayementCard.findById(req.params.id)
    .then(PayementCard => {
        if(!PayementCard) {
            return res.status(404).send({
                message: " PayementCard found with id " + req.params.id
            });            
        }
        res.send(PayementCard);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "PayementCard not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving PayementCard with id " + req.params.id
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
    PayementCard.findByIdAndUpdate(req.params.id, {
      
        name: req.body.name ,
        icon: req.body.req
    }, {new: true})
    .then(PayementCard => {
        if(!PayementCard) {
            return res.status(404).send({
                message: "categorie not found with id " + req.params.id
            });
        }
        res.send(PayementCard);
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
    PayementCard.findByIdAndRemove(req.params.id)
    .then(PayementCard => {
        if(!PayementCard) {
            return res.status(404).send({
                message: "card not found with id " + req.params.id
            });
        }
        res.send({message: "card deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "card not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete card with id " + req.params.id
        });
    });
  };