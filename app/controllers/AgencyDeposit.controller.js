var AgencyDeposit = require('../models/AgencyDeposit.model');
var Agency = require('../models/Agency.model');
/************** Add Agency deposit ******************/
exports.createDeposit = (req, res) => {

    if (!req.body._agency) {
        return res.status(400).send({
            message: "Agency can not be empty"
        });
    }

    if (!req.body._currency) {
        return res.status(400).send({
            message: "Cuurency can not be empty"
        });
    }

    const agencyDeposit = new AgencyDeposit({
        date: req.body.date,
        amount: req.body.amount,
        observation: req.body.observation,
        _currency: req.body._currency,
        _agency: req.body._agency
    });

    agencyDeposit.save()
        .then(deposit => {
            Agency.findOne({"_id": agencyDeposit._agency}, function (err, agency) {
                if (!err && agency) {
                    agency._deposit.push(agencyDeposit._id); // update ur values goes here
                    var nvAgency = new Agency(agency);
                    nvAgency.save();
                    res.send({
                        success: 'success',
                        deposit: deposit,
                        agency: agency
                    });
                } else console.log(err);
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the description of the agency deposit ."
            });
        });

};

/**************  Retrieve and return all agency deposit from the database by agency Id.************/
exports.findAllDepositByAgencyID = (req, res) => {
    AgencyDeposit.find({_agency: req.params.id})
        .populate("_currency")
        .populate("_agency")
        .exec((err, deposit) => {
            if (!deposit) return res.status(400).send('Deposit not found.');
            res.send(deposit);
        });
};

/************* Delete an agency deposit with the specified Id in the request************/
exports.delete = (req, res, next) => {
    AgencyDeposit.findByIdAndRemove(req.params.id)
        .then(deposit => {
            if (!deposit) {
                return res.status(404).send({
                    message: "Deposit not found with id " + req.params.id
                });
            }
            console.log(deposit)
            Agency.findById(deposit._agency, (err, agency) => {
                if (err) return res.status(500).send(err.message || "Agency not found.");
                agency._deposit.map(deposit => {
                    if (agency._deposit.indexOf(req.params.id) != -1) {
                        agency._deposit.splice(agency._deposit.indexOf(req.params.id), 1);
                        var nvAgency = new Agency(agency);
                        nvAgency.save();
                    }
                });
            });
            res.send({message: "Deposit deleted successfully!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Deposit not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete deposit with id " + req.params.id
        });
    });
};
