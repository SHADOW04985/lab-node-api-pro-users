const express = require("express");
var router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;

const {User} = require('../model/UserModel.js')

router.get('/', (req, res) => {
    User.find((err, users) => {
        if(err)
            res.status(500).json({errorMessage: "Unable to retrieve information"})
        else
            res.send(users)
    })
})


router.get('/:id', (req, res) => {
    const id = req.params.id

    if(ObjectId.isValid(id)) {
        User.find((err, user) => {
            if(err)
                res.status(500).json({errorMessage: "Unable to retrieve information"})
            else{
                if(user)
                    res.send(user)
                
                else
                    res.status(404).json({message: "User doesn't exist"})
            }
                
        })
    }
    else{
        res.status(400).json({message: "User doesn't exist"})
    }
})


router.post('/', (req,res) => {
    if(req.body.name && req.body.email){
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            id: req.body.id,
            squad: req.body.squad 
        })

        user.save((err, user) => {
            if(err) {
                res.status(500).json({errorMessage: "Error saving data in the database"})
            }
            else{
                res.status(201).json({created: user})
            }
        })
    }
    else{
        res.status(400).json({errorMessage: "Please provide the necessary details"})
    }
})


router.put('/:id', (req, res) => {
    const id = req.params.id
    if (!ObjectId.isValid(id)) 
        res.status(404).json({ message: "User doesn't exist" })

    else if (req.body.name && req.body.email) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            id: req.body.id,
            squad: req.body.squad
        }

        User.updateOne({ '_id': id }, user, (err, user) => {
            if (err) res.status(500).json({errorMessage: "Unable to modify the information of the user"})
            else {
                res.redirect(`/users/${id}`)
            }
        })
    } else {
        res.status(400).json({ errorMessage: "Please give the  name & info about the user." })
    }
})


router.delete('/:id', (req, res) => {
    const id = req.params.id
    if (ObjectId.isValid(id)) {
        User.findByIdAndRemove(id, (err, user) => {
            if (err) res.status(500).json({errorMessage: "Unable to remove the user"})
            else {
                if (user) res.status(201).json({ message: "User deleted Successfully" })

                else res.status(404).json({ message: "Unable to find the user" })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid user id' })
    }
})


module.exports = router
