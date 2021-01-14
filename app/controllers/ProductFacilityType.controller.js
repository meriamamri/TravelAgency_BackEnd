var ProductFacilityType = require('../models/ProductFacilityType.model');

/************** Add type productFacility ******************/
exports.createTypeProductFacility = async (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Product Facility Type title can not be empty"
        });
    }
    const productFacilityType = new ProductFacilityType({
        name: req.body.name
    });
    await productFacilityType.save()
        .then(type => {
            res.send(type);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the type of product facility ."
            });
        });
};

/**************  Retrieve and return all types from the database.************/
exports.findAllTypes = (req, res) => {
    ProductFacilityType.find().exec((err, ProductsFacilityType) => {
        if (!ProductsFacilityType) return res.status(400).send('Types not found.');
        ProductsFacilityType.map(obj => obj._facilities = []);
        res.send(ProductsFacilityType);
    });
};

/**************  Retrieve and return all types with their productFacilities from the database ************/
exports.findAll = (req, res) => {
    ProductFacilityType.find().populate('_facilities').exec((err, ProductsFacilityType) => {
        if (!ProductsFacilityType) return res.status(400).send('Types not found.');
        res.send(ProductsFacilityType);
    });
};

/************** Find a single type with a typeId ************/
exports.findOne = async (req, res) => {
    console.log(req.params.id);
    await ProductFacilityType.findById(req.params.id)
        .then(ProductFacilityType => {
            if (!ProductFacilityType) {
                return res.status(404).send({
                    message: " ProductFacilityType found with id " + req.params.id
                });
            }
            res.send(ProductFacilityType);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ProductFacilityType not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving ProductFacilityType with id " + req.params.id
            });
        });
};

/************* Update a type identified by the typeId in the request ************/
exports.update = async (req, res) => {
    // Validate Request
    if (!req.body.name) {
        return res.status(400).send({
            message: "ProductFacility content can not be empty"
        });
    }

    // Find note and update it with the request body
    await ProductFacilityType.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    }, {new: true})
        .then(ProductFacilityType => {
            if (!ProductFacilityType) {
                return res.status(404).send({
                    message: "ProductFacilityType not found with id " + req.params.id
                });
            }
            res.send(ProductFacilityType);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "ProductFacilityType not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating ProductFacilityType with id " + req.params.id
            });
        });
};

/************* Delete a type with the specified typeId in the request************/
exports.delete = (req, res) => {
    ProductFacilityType.findByIdAndRemove(req.params.id)
        .then(ProductFacilityType => {
            if (!ProductFacilityType) {
                return res.status(404).send({
                    message: "ProductFacilityType not found with id " + req.params.id
                });
            }
            res.send({message: "ProductFacilityType deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "ProductFacilityType not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete ProductFacilityType with id " + req.params.id
        });
    });
};

