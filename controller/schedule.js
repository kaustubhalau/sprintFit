const User = require('../models/users');
const mongoose = require('mongoose');

module.exports.getSchedule = async function(req, res){
    try{
        console.log(req.body.date);
        let date = new Date(req.body.date).toLocaleDateString();
        console.log('print date', date);
        let habits = await User.find({date: date});

        return res.status(200).json({
            message: "Found it",
            data: {
                habits : habits
            }
        });
    }catch(err){
        return res.status(400).json({
            message:"Something wrong in getSchedule",
        });

    }
}

module.exports.scheduleHomePage = function(req, res){
    return res.render('Habit.ejs');
}

module.exports.updateStatus = async function(req,res){
    return res.render
}

module.exports.updateStatus = async function(req, res){
    try{
        let arr = req.body;
        console.log('Update Array',req.body);
        for(let i in arr){
            let habit = await User.findByIdAndUpdate(i,{status:arr[i]});
        }
        return res.status(200).json({
            message : "Data added successfully",
        });
    }catch(err){
        console.log("Error while updating status",e);
        return res.status(400).json({
            message: "Error while updating status",
        });
    }
}