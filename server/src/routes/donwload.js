const { Router } = require('express');
const router = Router();

const fs = require('fs');
const path = require('path');
const processPath = require('../utils/path');

router.get('/:route?/:file',(req,res)=>{
    const dir_path = processPath(req.params.route);
    const file = path.join(dir_path.absolutePath,req.params.file);
    console.log(file);
    res.download(file);
})

module.exports = router;