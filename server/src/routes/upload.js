const { Router} = require('express');
const fileupload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const router = Router();

const processPath = require('../utils/path');
const movefile = require('../utils/mv');
const moveFile = require('../utils/mv');
const { dir } = require('console');

router.use(fileupload({
    useTempFiles : true,
    tempFileDir : path.join(__dirname,'tmp'),
}));

router.post('/:route?',async (req,res,next)=>{
    if (!req.files) {
        return res.status(400).json({'res':'No files were uploaded'});
    }

    let dir_path = processPath(req.params.route);
    let files = req.files.file;
    if(!Array.isArray(files)) {
        files = [files];
    }

    try {
        for (const file of files) {
            await moveFile(file,dir_path.absolutePath);
        }
    } catch (err) {
        if (err.code) {
            return next(err);
        }

        return res.status(400).json({
            succes: false,
            message: err.message,
            path: dir_path.relativePath,
        })
    }

    res.json({
        succes: true,
        message: 'Files succedd upaloded',
        path: dir_path.relativePath,
    });
})

module.exports = router;