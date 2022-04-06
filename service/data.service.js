const jwt = require('jsonwebtoken')

const db = require('./db')

database={
    1000:{userid:1000,username:"aswin",psw:1000}
  }

  const register = (userid,username,psw)=>{
      return db.User.findOne({userid})
      .then(user=>{
        if(user){
          return{
            statusCode:422,
            status:false,
            message:"user already exist"
          }
        }
        else{
          const newUser= new db.User({
            userid,
            username,
            psw,
            event:[]
          })
          newUser.save()
          return{
            statusCode:200,
            status:true,
            message:"successfully registered"
          }
        }
      })
  }

  const login = (userid,psw)=>{
      return db.User.findOne({userid,psw})
      .then(user=>{
           if(user){
               currentUid = userid
               currentUname = user.username
               const token = jwt.sign({
                currentUid:userid
              },'scecretkey409')
     
               return{
                statusCode:200,
                status:true,
                message:"successfully log in",
                currentUid,
                currentUname,
                token
               }
           }
           else{
             return{
               statusCode:422,
               status:false,
               message:"incorrect password/account no"
             }
           }
      })
}

   const addEvent = (date,event,userid)=>{

       return db.User.findOne({userid})
       .then(user=>{
          if(user){
              user.event.push({
                date:date,
                event:event
              })
              user.save()
              return{
                   statusCode:200,
                   status:true,
                   message:"added"
              }
          }
          else{
            return{
              statusCode:422,
              status:false,
              message:"operation denied"
            }
          }
       })
   }

   const showEvent = (userid)=>{
      return db.User.findOne({userid})
      .then(user=>{
        if(user){
          return{
            statusCode:200,
            status:true,
            event:user.event
          }
        }
        else{
          return{
            statusCode:422,
            status:false,
            message:"user doesnot exist"
          }
        }
      })
   }
   
module.exports={
      register,
      login,
      addEvent,
      showEvent
  }