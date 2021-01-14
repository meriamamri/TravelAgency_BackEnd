module.exports = (app, router, upload) => {
    const fileWorker = require('../controllers/file.controller.js');


    app.post('/api/file', upload.single("profile"), fileWorker.uploadFile);

    app.get('/api/files/getall', fileWorker.listAllFiles);

    app.get('/api/files/:filename', fileWorker.downloadFile);

    app.delete('/api/files/:filename', fileWorker.deleteFile);

};