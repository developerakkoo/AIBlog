const SerpApi = require('google-search-results-nodejs');
const search = new SerpApi.GoogleSearch("391476873291cea8237fd8b1e8a113d267a859887d9ddd2e01e269fa385034b8");
const {dataExtractor} = require('./htmlExtractor');
// const {clearFile} = require('./util/clearFile');
// const {saveToFile} = require('./util/saveFile');

exports.searchData = async(req,res)=>{
    let topic = req.body.topic // search topic
    const params = {
        engine: "google",
        q:  `https://medium.com/search?q=${topic}` ,
    }; 
    
    // clearFile('./Data/searchResult.json'); // Delete File
    
    let result = []// Search Result 
    const callback = function(data) {
        let searchData = data["organic_results"]
        searchData.forEach(element => {
            result.push({Title:element.title,Link:element.link}); 
        });
        
        // saveToFile(result,1);  //save to json 
        dataExtractor(result,topic);      // extract data from links and save to 
        res.status(200).json({message:'Searching Data successfully'})
    };
    
    
    // Show result as JSON
    search.json(params, callback);
}


