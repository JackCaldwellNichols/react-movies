const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//registration 

router.post('/register', async (req, res) => {
    const userCheck = await User.findOne({email: req.body.email})
         if(userCheck){
            return res.status(400).json('User already exists')
     }
    
    const userNameCheck = await User.findOne({username: req.body.username})
        if(userNameCheck){
            return res.status(400).json("Username taken!")
         }  
    

 if(req.body.password.length < 6){
       return res.status(400).json("Password must contain more than 6 characters.")
    }
   const hashedP = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedP
    })
        try {
            const savedUser = await newUser.save()
            res.status(201).json(savedUser)
        } catch (error) {
            res.status(500).json(error)
        }
})

//login

router.post('/login', async (req, res) => {
    if(!req.body){
        res.status(400).json("Fields missing!")
    }
    try {
        const user = await User.findOne({username: req.body.username})
            if(!user){
                return res.status(400).json("No user found")
            }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password,)
            if(!passwordCheck){
                return res.status(400).json("Incorrect email or password")
            }
        const token = jwt.sign({
            id: user._id,
            
        }, 
        process.env.JWT_SECRET,
        {expiresIn: '1d'}
        ) 
        const {password, ...others} = user._doc
        res.status(200).json({...others, token})
    }catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})



module.exports = router







