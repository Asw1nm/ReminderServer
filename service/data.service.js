const jwt = require('jsonwebtoken')

const db = require('./db')

const register = (userid, username, psw) => {
  return db.User.findOne({ userid }).then(user => {
    if (user) {
      return {
        statusCode: 422,
        status: false,
        message: "user already exist"
      }
    }
    else {
      const newUser = new db.User({
        userid,
        username,
        psw,
        eventDet: []
      })
      newUser.save()
      return {
        statusCode: 200,
        status: true,
        message: "successfully registered"
      }
    }
  })
}

const login = (userid, psw) => {
  return db.User.findOne({ userid, psw }).then(user => {
    if (user) {
      currentUid = userid
      currentUname = user.username
      const token = jwt.sign({
        currentUid: userid
      }, 'scecretkey409')

      return {
        statusCode: 200,
        status: true,
        message: "successfully log in",
        currentUid,
        currentUname,
        token
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "incorrect password/account no"
      }
    }
  })
}

const addEvent = (date, event, userid) => {

  return db.User.findOne({ userid }).then(user => {
    if (user) {
      user.eventDet.push({
        date: date,
        events: event
      })
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: "added"
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "operation denied"
      }
    }
  })
}

const showEvent = (userid) => {
  return db.User.findOne({ userid }).then(user => {
    if (user) {
      return {
        statusCode: 200,
        status: true,
        eventDet: user.eventDet
      }
    }
    else {
      return {
        statusCode: 422,
        status: false,
        message: "user doesnot exist"
      }
    }
  })
}

const deleteEvent = (event, userid) => {
  return db.User.updateOne({ "userid": userid }, { $pull: { eventDet: { events: event } } }).then(result => {
    if (!result) {
      return {
        statusCode: 422,
        status: false,
        message: "Failed to delete"
      }
    }
    else {
      return {
        statusCode: 200,
        status: true,
        message: "deleted one row"
      }
    }
  })

}

const updateEvent = (uid, indexNum, edate, eventd) => {

  return db.User.findOne({ uid }).then(user => {
    if (!user) {
      return {
        statusCode: 422,
        status: false,
        message: "Failed to add"
      }
    }
    else {
      if (user.eventDet[indexNum]["date"] != edate && edate != "") {
        user.eventDet[indexNum].date = edate
      }
      if (user.eventDet[indexNum]["events"] != eventd && eventd != "") {
        user.eventDet[indexNum].events = eventd
      }
      user.markModified('eventDet')
      user.save()
      return {
        statusCode: 200,
        status: true,
        message: "updated"
      }
    }
  })
}

const getNotification = (uid) => {
  let user = db.User.find({ uid })
  
}

module.exports = {
  register,
  login,
  addEvent,
  showEvent,
  deleteEvent,
  updateEvent,
  getNotification
}