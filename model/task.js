const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    discription:{
        type:String,
        trim:true,
    },
    attachment:{
        type:String,
        trim:true
    },

},{ timestamps:true });

module.exports = mongoose.model('Task', taskSchema);
