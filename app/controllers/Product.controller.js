
const ProductCtrl ={}
var Product = require('../models/Product.model')

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name || "Unnamed Product", 
       
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve and return all Products from the database.
exports.findAll = (req, res) => {
    Product.find()
    .then(Products => {
        res.send(Products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Products."
        });
    });
};

// Find a single Product with a ProductId
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
    .then(Product => {
        if(!Product) {
            return res.status(404).send({
                message: " Product found with id " + req.params.id
            });            
        }
        res.send(Product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Product with id " + req.params.id
        });
    });
};
// Update a Product identified by the ProductId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find Product and update it with the request body
    Product.findByIdAndUpdate(req.params.id, {
        name: req.body.name || "Unnamed Product", 
        
    }, {new: true})
    .then(Product => {
        if(!Product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send(Product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Product with id " + req.params.id
        });
    });
};
// Delete a Product with the specified ProductId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
    .then(Product => {
        if(!Product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Product with id " + req.params.id
        });
    });
};