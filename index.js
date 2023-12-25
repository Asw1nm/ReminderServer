const express = require('express')

const dataService = require('./service/data.service') 

const jwt = require('jsonwebtoken')

const app = express()


const cors = require('cors')


app.use(cors({
    origin:'http://localhost:4200'
}))

app.use(express.json())

const jwtMiddleware = (req,res,next)=>{
    try{
       const token = req.headers["x-access-token"]
       const data = jwt.verify(token,'scecretkey409')
       req.currentUid= data.currentUid
       next()
    }
    catch{
        res.status(422).json({
            statusCode:422,
            status:false,
            message:"please log in"
        })
    }
}

app.post('/register',(req,res)=>{

   return dataService.register(req.body.userid,req.body.username,req.body.psw)
   .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

app.post('/login',(req,res)=>{
   return dataService.login(req.body.userid,req.body.psw)
   .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

app.post('/dashboard',jwtMiddleware,(req,res)=>{
    return dataService.addEvent(req.body.date,req.body.event,req.body.userid)
   .then(result=>{
    res.status(result.statusCode).json(result)
    })
})

app.post('/events',jwtMiddleware,(req,res)=>{
    return dataService.showEvent(req.body.userid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/deleteEvent',jwtMiddleware,(req,res)=>{
    return dataService.deleteEvent(req.body.event,req.body.userid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/updateEvent',jwtMiddleware,(req,res)=>{
    return dataService.updateEvent(req.body.uid,req.body.indexNum,req.body.edate,req.body.eventd)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

app.post('/getNoti',(req,res) => {
    return dataService.getNotification().then(result =>{
        res.status(result)
    })
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})