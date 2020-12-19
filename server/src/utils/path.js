const path = require('path');

const slash = process.platform === 'win32' ? '\\' : '/';


const processPath = (url_path) => {
    const relativePath = url_path ? url_path.replace(/--/g,slash) : slash;
    const absolutePath = path.join(__dirname,'../uploads/' + relativePath);

    return { relativePath,absolutePath };
}

module.exports = processPath;