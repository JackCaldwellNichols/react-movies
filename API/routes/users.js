const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcryptjs')
const verify = require('../verifyToken.js')



//update account

router.put('/:id', async (req, res) => {
    if(req.body.id === req.params.id){
        if(req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
            const {password, ...others} = updatedUser._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Not authorised!")
    }
})


//delete account

router.delete('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(403).json("Not authorised!")
    }
})



//get account


router.get('/profile/:id', async (req, res) => {

        try {
            const user = await User.findById(req.params.id)
            const {password, ...info} = user._doc
            res.status(200).json(info)
        } catch (error) {
            res.status(500).json(error)
        }
 
})  

//add movie to watchlist

router.put('/watchlist/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user.watchlist.includes(req.body.movie)){
            await user.updateOne({$push: {watchlist: req.body.movie}})
            res.status(200).json(user)
        }else{
            res.status(403).json("Already in your watchlist!")
        }
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})

router.put('/watchlistRemove/:id', async (req, res) => {
    const currentUser = await User.findById(req.params.id)
    try {
        if(currentUser.watchlist.includes(req.body.movie))
            await currentUser.updateOne({$pull: {watchlist: req.body.movie}})
            res.status(200).json("Removed from watchlist")
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
})




module.exports = router