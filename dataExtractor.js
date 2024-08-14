// const axios = require('axios');
// const cheerio = require('cheerio');
// const searchData = require('./Data/searchResult.json'); 
// const fs = require('fs');
// const path = require('path');
// const {clearFile} = require('./util/clearFile');
// const Data = require('./model/Data');

// // const url = searchData[2].Link;

// function saveToFile(data) {
//     const outputFilePath = path.join(__dirname, `./Data/htmlResult.html`);
//     // const logMessage = `${topic}:  ${title} => ${`${link}`}\n`;
//     fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
// }
// clearFile('./Data/htmlResult.json'); // clear file

// let metaData = []
// let linkCount = searchData.length
// async function getHtml(){
//     for(element of searchData) {
//         // console.log(element.Link);
//         axios.get(element.Link)
//         .then(response => {
//         const html = response.data;
//         saveToFile(html)
//         metaData.push({html})
//         // console.log(num);
//         console.log(metaData.length);
//         if ( linkCount == metaData.length) {
//         }
//         })
//         .catch(error => {
//             linkCount = linkCount-1
//             // saveToFile(metaData)
//         console.error('Error fetching the webpage:',error.config.url);
//         });
//     };
//     // console.log(metaData);
// }



// module.exports = {getHtml}
