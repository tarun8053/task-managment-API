const Task = require('../model/task');

exports.createTask = async (req, res, next) => {
    try {
        
        const {title, discription} = req.body;

        const newtask = new Task({
            title:title,
            discription:discription,
            attachment : req.file ? req.file.path : null
            
        })

            await newtask.save();
            res.status(201).json({message : 'Task create sucessfully', task : newtask});
    } catch (err) {
        res.status(500).json({message : "Some error occured", error : err.message})
    }
}