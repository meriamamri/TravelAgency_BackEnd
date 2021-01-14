var Contact = require('../models/HotelContact.model');

// Create and Save a new Contact
exports.create = (req, res) => {
    const contact = new Contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        job: req.body.job,
        establishment: req.body.establishment,
    });

    // Save Contact in the database
    contact.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Contact."
            });
        });
};

// Retrieve and return all contacts from the database.
exports.findAll = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.send(contacts);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving contacts."
            });
        });
};

// Find a single Contact with a contactId
exports.findOne = (req, res) => {
    Contact.findById(req.params.id)
    .populate('estblishment')
        .then(Contact => {
            if (!Contact) {
                return res.status(404).send({
                    message: " contact found with id " + req.params.id
                });
            }
            res.send(Contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "contact not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving contact with id " + req.params.id
            });
        });
};
// Update a Contact identified by the contactId in the request
exports.update = (req, res) => {
    // Validate Request
    // if(!req.body.name) {
    //     return res.status(400).send({
    //         message: "Contact content can not be empty"
    //     });
    // }

    // Find Contact and update it with the request body
    Contact.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        job: req.body.job,
    }, { new: true })
        .then(Contact => {
            if (!Contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id
                });
            }
            res.send(Contact);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating contact with id " + req.params.id
            });
        });
};
// Delete a Contact with the specified contactId in the request
exports.delete = (req, res) => {
    Contact.findByIdAndRemove(req.params.id)
        .then(Contact => {
            if (!Contact) {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id
                });
            }
            res.send({ message: "Contact deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Contact not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Contact with id " + req.params.id
            });
        });
};
exports.findByCountryId = (req, res) => {
    Contact.find({ country: req.params.countryId })
        .exec(function (err, contacts) {
            if (err) {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "contacts not found with given Country Id " + req.params.countryId
                    });
                }
                return res.status(500).send({
                    message: "Error retrieving contacts with given Country Id " + req.params.countryId
                });
            }

            res.send(contacts);
        });
};

// Find all contacts by EstabId
exports.findByEstabId = (req, res) => {
    Contact.find({ establishment : req.params.estabId })
    .exec(function (err, contacts) {
      if (err){
        if(err.kind === 'ObjectId') {
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