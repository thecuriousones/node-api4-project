const dotenv = require('dotenv').config()
const express = require("express")
const cors = require("cors")
const server = express()
const port = process.env.PORT || 5000
const User = require('./data.js')


server.use(cors())
server.use(express.json())



// ENDPOINTS
server.get('/api/users', (req,res)=>{
    User.find()
        .then(users =>{
            console.log(users)
            res.status(200).json(users)
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({message: "The users information could not be retrieved"})
        })
})

server.post('/api/register', (req,res)=>{
    const newUser = req.body
    if(!newUser.username || !newUser.password){
        res.status(400).json({ message: "Please provide a username and password" })
    }else{
        User.insert(newUser)
            .then(user =>{
                console.log(user)
                res.status(201).json(user)
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({message:"There was an error while saving the user to the database"})
            })
    }
})

server.post('/api/login', async (req,res)=>{
    const loggingIn = req.body
    try{
        if(!loggingIn.username || !loggingIn.password){
            res.status(400).json({ message: "Please provide your name and password" })
        }else{
            const login = User.login(loggingIn)
            if(!login){
                res.status(404).json({ message: "This user does not exist" })
            }else{
                console.log('Login was succesful!')
                res.status(200).json({message: "Welcome Back!"})
            }
        }
    }catch(err){
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

// API
server.use('/api/',(_,res)=>{
    res.json({data: User.credentials()})
})

server.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})