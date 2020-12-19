const { Router } = require('express');
const router = Router();

const fs = require('fs');
const path = require('path');
const processPath = require('../utils/path');

router.get('/:route?',(req,res)=>{
    const dir_path = processPath(req.params.route);
    const read = fs.readdir(dir_path.absolutePath,(err,files)=>{
        if (err) {
            res.status(404).json({
                res: 'No Path'
            });
        }

        res.json({
            files
        })
    });
});

router.post('/:route?',(req,res)=>{
    const dir_path = processPath(req.params.route);
    const create = fs.mkdir(path.join(dir_path.absolutePath,req.body.name) ,(err)=>{
        if (err) {
            res.status(400).json({
                succes: false,
                message: err.message,
                dir: path.relativePath,
            });
        }
    })
    
    res.json({
        succes: true,
        message: 'Dir is created',
        dir: path.relativePath,
    })
})

module.exports = router;