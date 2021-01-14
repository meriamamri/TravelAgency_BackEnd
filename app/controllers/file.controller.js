const uploadFolder =  './uploads/';
const fs = require('fs');

exports.uploadFile = (req, res) => {
    try {
        res.send(req.file);
    }catch(err) {
        res.send(400);
    }
};

exports.listAllFiles = (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        res.send(files);
    })
};

exports.downloadFile = (req, res) => {
    var filename = req.params.filename;
    res.download(uploadFolder + filename);
};

exports.deleteFile = (req, res) => {
    if (!req.params.filename) {
        console.log("No file received");
        return res.status(500).json('error in delete');

    } else {
        console.log('file received');
        console.log(req.params.filename);
        try {
            fs.unlinkSync(uploadFolder+'/'+req.params.filename);
            console.log('successfully deleted');
            return res.status(200).send('Successfully! Image has been Deleted');
        } catch (err) {
            // handle the error
            return res.status(400).send(err);
        }

    }
};