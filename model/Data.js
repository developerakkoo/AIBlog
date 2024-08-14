const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const DataSchema = new Schema({
    SearchTopic:{
        type: String,
        required: true
    },
    SearchResult:{
        type:[],
        require:true
    },

},{timestamps: true});

module.exports = mongoose.model("Data",DataSchema);