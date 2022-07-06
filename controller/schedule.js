const User = require('../models/users');
const mongoose = require('mongoose');

module.exports.getSchedule = async function(req, res){
    try{
        console.log(req.body.date);       // get date from body
        let date = new Date(req.body.date).toLocaleDateString();// returns a string with language sensitive representation for date portion 
        console.log('print date', date);
        let habits = await User.find({date: date});  // find habit by date

        return res.status(200).json({
            message: "Found it",
            data: {
                habits : habits           // return habit
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

//Updating status by id
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