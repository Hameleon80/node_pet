//include modules
var express = require('express'),
    path = require('path'),
    fs = require('fs');

//variables
var router = express.Router(),
    basePath = 'D:/Yura/111/works/node/pet/public',
    dirPath;

//GET requests
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Main page'
    });
});

router.get('/foto-gallery', (req, res, next) => {
    dirPath = path.join(basePath, '/images', req.url);

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            throw err;
        }
        var fotos = [],
            i = 0;
        files.forEach((file) => {
            fotos[i] = '/images' + req.url + '/' + file;
            i++;
        });
        res.render('pictures', {
            title: 'Foto gallery',
            fotos: fotos
        });
    });
});

router.get('/movies', (req, res, next) => {
    dirPath = path.join(basePath, req.url);
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            throw err
        }
        var videos = [];
        var i = 0;
        files.forEach((video) => {
            videos[i] = path.join('/movies/', video);
            i++;
        });
        res.render('video', {
            title: 'Video',
            videos: videos
        });
    });
});

module.exports = router;