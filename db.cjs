
// //server is started when db is connected
// const{MongoClient}=require('mongodb')//mongodb connection
// //connection establish
// let db
// function connectToDB(startServer)
// {
//     MongoClient.connect('mongodb://127.0.0.1:27017/ExpenseTracker').then(function(client)
//     {
//         db=client.db()
//         //console.log(db)//connection return 
//         return startServer()
//     }).catch(function(error)
//     {
//         return startServer(error)
//     })
//     //console.log(db)
// }
// //establish connection and get value from db
// function getDb()
// {
//     return db
// }
// module.exports={connectToDB,getDb}


// const {MongoClient} = require('mongodb')

// let db
// function connectToDb(startServer) {
//     MongoClient.connect('mongodb+srv://subiga:appa2004@cluster0.acrxjar.mongodb.net//Expense-Tracker?retryWrites=true&w=majority').then(function(client) {
//     console.log("mongodb connected")    
//     db = client.db()
//         return startServer()
//     }).catch(function(error) {
//         return startServer(error)
//     })
// }

// function getDb() {
//     return db
// }

// module.exports = {connectToDb, getDb}



const { MongoClient } = require('mongodb')
let db                                   //importing mongodb
function connectToDb(startServer) {                                                     //to connect mongodb//db stores the connection //instead of localhost give 127.0.0.1
    MongoClient.connect('mongodb+srv://subiga:appa2004@cluster0.acrxjar.mongodb.net/Expense-Tracker?retryWrites=true&w=majority').then(function (client) { //returns client -->async func as .then is used
        //connection establishment
        db = client.db()
        //starting the server                                  
        return startServer()
    }).catch(function (error) {               //handling the error, if error occurs then server won't start
        return startServer(error)             //captures error and sends to callback func
    })
}
function getDb() {
    return db
}
module.exports = { connectToDb, getDb }  