const { google } = require('googleapis');
const blogger = google.blogger('v3');
const Data = require('../model/Data');
require('dotenv').config();
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
    );
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/blogger'],
    });

exports.authenticate = async (req, res) => {
    const { tokens } = await oauth2Client.getToken(req.query.code);
    oauth2Client.setCredentials(tokens);
    res.status(200).json({message:'Authentication successful!,'});
    }




async function PostBlog(req,res){
    try {
        const postContent = '<p>Your HTML blog content here</p>';
  const blogId = 'YOUR_BLOG_ID'; // Replace with your actual Blog ID
    const post = {
    kind: 'blogger#post',
    blog: {
    id: blogId,
    },
    title: 'Your Blog Post Title',
    content: postContent,
    };
    const response = await blogger.posts.insert({
        auth: oauth2Client,
        blogId,
        resource: post,
    });
    res.status(200).json({message:'Post published successfully:', Data: response.data});
    } catch (error) {
        res.status(500).json({statusCode:500,status:'ERROR',message: error.message});
    }
}


exports.getAllData = async(req,res)=>{
    try {
        const savedData = await Data.find();
        if (savedData.length == 0) {
        res.status(404).json({message:"Data Not Found",statusCode:404});
        }
        res.status(200).json({message:"All Data Fetched Successfully",Data:savedData})
    } catch (error) {
        res.status(500).json({statusCode:500,status:'ERROR',message: error.message});
    }
}

exports.getDataById = async(req,res)=>{
    try {
        const savedData = await Data.findOne({_id : req.params.ID});
        if (!savedData) {
            res.status(404).json({message:"Data Not Found",statusCode:404});
            }
        res.status(200).json({message:"All Data Fetched Successfully",Data:savedData})
    } catch (error) {
        res.status(500).json({statusCode:500,status:'ERROR',message: error.message});
    }
}