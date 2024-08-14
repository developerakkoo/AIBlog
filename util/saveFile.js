const fs = require('fs');
const path = require('path');
// const d = require('../Data/')
exports.saveToFile = (data,num) => {
    let outputFilePath
    // console.log(path);
    if (num == 1) {
        outputFilePath = path.join(__dirname, `../Data/searchResult.json`);
    }
    else{
        outputFilePath = path.join(__dirname, `../Data/extractorResult.json`);
    }
    // const logMessage = `${topic}:  ${title} => ${`${link}`}\n`;
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
}