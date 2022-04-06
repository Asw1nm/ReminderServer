const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Reminder',{
    useNewUrlParser:true
})

const User = mongoose.model('User',{
    userid:Number,
    username:String,
    psw:String,
    event:[]
})

module.exports={
    User
}