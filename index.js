const express = require('express');
const mongoose = require('mongoose');
const  DB_URL = "mongodb+srv://farmsell:farmsell@cluster0.mh36s.mongodb.net/BlogAI"
const app = express();
app.use(express.json());
const {SearchRoute} =  require('./routes/search.route');

app.use(SearchRoute);

app.listen(3000,async()=>{
    console.log('sever started on port: http://localhost:3000');
    try {
        await  mongoose.connect(DB_URL)
            console.log('connected');
        
    } catch (error) {
        console.log(error);
    }

})