const axios = require('axios');
const {saveToFile} = require('../util/saveFile');
const searchLinks = require('../Data/searchResult.json');
const {clearFile} = require('../util/clearFile');
const Data = require('../model/Data');
const dataArray = [];

async function dataExtractor (result,topic){  
  let count = 0
    // clearFile('./Data/extractorResult.json')
  for(element of result){
    // console.log(element.Link);
  const axios = require('axios');
  const options = {
    method: 'POST',
    url: 'https://magicapi-article-extraction.p.rapidapi.com/extract',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'ed6f15389fmsh08bd43fe39a7e74p1d124cjsnd2cfd7d29dd3',
      'X-RapidAPI-Host': 'magicapi-article-extraction.p.rapidapi.com'
    },
    data: {
      url: element.Link
    }
  };
  try {
    const response = await axios.request(options);
    let data = {
      siteName:response.data.siteName,
      searchTitle:element.Title,
      searchURL:response.data.url,
      title:response.data.title,
      topImage:response.data.topImage,
      description:response.data.description,
      text:response.data.text,
      summary:response.data.summary,
      html:response.data.html
      
    }
    dataArray.push(data);
    console.log(`Total Links Count:${result.length}, Link data extracted ${count+=1}`,'Please wait...');
  } catch (error) {
    console.error(error.response.data,error.response.status);
  }
  }
  insertData(dataArray,topic)
  // saveToFile(dataArray)
  console.log('Process Completed!');
}

// dataExtractor();

async function insertData(data,topic){
  try {
      // console.log(data);
      const dataObj ={
        SearchTopic:topic,
        SearchResult:data
      }
      await Data.create(dataObj);
      console.log('Data Inserted To MongoDB');
  } catch (error) {
      console.log(error);
  }
}


module.exports = {dataExtractor}