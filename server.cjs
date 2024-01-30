//node.js file 
//import in js -> require in cjs(node.js)
//export{} in js -> module.exports{} in cjs(node.js)
//basic oru server enna pannum na -> html,css,js(send)-> browser ku send pannum


//server create
// const express= require("express")// express package fetch and store

// //node does not have capability to understand json file so we use bodyParser
// const bodyParser=require("body-parser")//It is a tool to capture the body

// const app = express()//create server on backend

// app.use(express.static(__dirname))//app.use ()bracket kulla eruka file a application use
//                                   //express.static(__dirname) it use all file in real time app with connectivity folder

// app.use(bodyParser.json())

//first capture and do what purpose
//object - req,res 
//req -> client send to server
//res -> send by server

//capture the request from js
// app.get('/get',function(request,response){
//     //console.log(request)
//     const respData={
//         "name":"subiga",
//         "grade":4,
//         "Rank":6
//     }
//     //sending response from server
//     response.status(200).json(respData)
// })


// app.post('/post',function(request,response)
// {
//     //console.log(request.body)
//     if(request.body.username === "subiga" && parseInt(request.body.password) === 123)
//     {
//         response.status(200).json({
//             "validation":"user-validated"
//         })
//     }
//     else{
//         response.status(404).json({
//             "validation":"user-invalid"
//         })
//     }
// })
// app.post('/post', function (request, response) {
//     if (request.body.username === "subiga" && toString(request.body.password) === 123) {
//         response.status(200).json({
//             "validation": "user-validated"
//         });
//     } else {
//         response.status(404).json({
//             "validation": "user-invalid"
//         });
//     }
// });
// app.listen(8000)//server start command
// console.log("hello1")

//importing required functions
// const {connectToDb,getDb}=require('./db.cjs')
// connectToDb()
// app.post('/post', function (request, response) {
//     response.status(200).json({
//         catagory:request.body.catagory,
//         amount:request.body.amount,
//         date:request.body.date
            
//     });
//      console.log(request.body)
// });
// let db
// // Connecting to the DB
// connectToDb(function(error) {
//     if(!error) {
//         // Starting the server
//         app.listen(8000)
//         console.log('Listening on port 8000...')
//         db = getDb()
//     } else {
//         // Server would not start
//         console.log(error)
//     }
// })
// console.log("hello1")


//my code
// const express = require('express')
// const bodyParser = require('body-parser')
// // importing required functions
// const {connectToDb, getDb} = require('./db.cjs')

// const app = express()
// app.use(bodyParser.json())

// let db
// // Connecting to the DB
// connectToDb(function(error) {
//     if(!error) {
//         // Starting the server
//         app.listen(9876)
//         console.log('Listening on port 3456...')
//         db = getDb()
//     } else {
//         // Server would not start
//         console.log(error)
//     }
// })

// app.get('/add-entry', function(request, response) {
//     //define collection name
//     //console.log(request.body)
//     db.collection('Data').insertOne(request.body)
// })


// app.use(express.static(__dirname))



const express = require('express')
const bodyParser = require('body-parser')
// importing required functions
const { connectToDb, getDb } = require('./db.cjs')
const { ObjectId } = require('mongodb')


const app = express()
app.use(bodyParser.json())
app.use(express.static(__dirname))


let db
// Connecting to the DB
connectToDb(function (error) {              //error is passed
    if (!error) {    //not error
        // Starting the server                                   
        app.listen(6789)
        console.log('Listening on port 8000...')
        db = getDb()                       //connection establishment
    } else {
        // Server would not start
        console.log(error)
    }
})

//endpoints
//add entry
app.post('/add-entry', function (request, response) {
    // console.log(request.body)
    db.collection('ExpenseData').insertOne(request.body).then(function () {
        response.status(201).json({                                                     //new file successfully created-201
            'status': 'data successfull entered'
        })
    }).catch(function (error) {                                                          //error handling
        response.status(500).json({
            'error': error
        })
    })
})

//get entry
app.get('/get-data', function (request, response) {
    // console.log(request.body)
    const entries = []             //empty array
    db.collection('ExpenseData').find().forEach(entry => entries.push(entry)).then(function () {                   //returns a cursor which points to first entry and it keeps on iterating
        response.status(200).json(entries)                                          //run a loop for find to iterate the cursor
    }).catch(function (error) {                                                          //error handling
        response.status(404).json({
            'error': error
        })
    })
})


//delete entry
app.delete('/delete-entry', function (request, response) {
    if (ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').deleteOne({
            _id: new ObjectId(request.body.id)
        }).then(function () {
            response.status(201).json({                                                     //new file successfully created-201
                'status': 'data successfull deleted'
            })
        }).catch(function (error) {                                                          //error handling
            response.status(500).json({                                                    //process incomplete ->500
                'error': error
            })
        })
    }
    else {
        response.status(500).json({
            'status': 'ObjectId not valid'
        })
    }
})


//update entry ->patch is used
app.patch('/update-entry', function (request, response) {
    if (ObjectId.isValid(request.body.id)) {
        db.collection('ExpenseData').updateOne(
            { _id: new ObjectId(request.body.id) },
            { $set: request.body.data }
        ).then(function () {
            response.status(201).json({
                'status': 'data successfully updated'
            })
        }).catch(function (error) {
            response.status(500).json({
                'error': error
            })
        })
    } else {
        response.status(500).json({
            'status': 'ObjectId not valid'
        })
    }
})


