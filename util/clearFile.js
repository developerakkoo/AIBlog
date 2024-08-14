const fs = require('fs');
const path = require('path');

exports.clearFile = (filePath) => {
    console.log("Clear Previous File Data...")
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
};
