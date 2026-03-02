const { UserModel } = require('../models/Users.model')
const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')

userRouter.get("/", async (req, res) => {
    let query = req.query
    try {
        const token = req.headers.authorization
        jwt.verify(token,/*key :  */'Mohit Raj Singh', async (err, decoded) => {
            if (decoded) {
                const users = await UserModel.find(query)
                res.send([users])
            } else {
                res.send({ "msg": "Some thing went wrong", "error": err.message })
            }
        })
    }
    catch (error) {
        res.send({ "msg": "Cannot get the users" })
    }
})

userRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    try {
        const token = req.headers.authorization
        jwt.verify(token,/*key :  */'Mohit Raj Singh', async (err, decoded) => {
            if (decoded) {
                await UserModel.findByIdAndUpdate({ _id: ID }, payload)
                res.send({ "msg": "Updated the User" })
            } else {
                res.send({ "msg": "Some thing went wrong", "error": err.message })
            }
        })
    } catch (err) {
        res.send({ "msg": "Cannot update the user", "error": err.message })
    }
})

userRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    try {
        const token = req.headers.authorization
        jwt.verify(token,/*key :  */'Mohit Raj Singh', async (err, decoded) => {
            if (decoded) {
                await UserModel.findByIdAndDelete({ _id: ID }, payload)
                res.send({ "msg": "Deleted the User" })
            } else {
                res.send({ "msg": "Some thing went wrong", "error": err.message })
            }
        })
    } catch (err) {
        res.send({ "msg": "Cannot delete the user", "error": err.message })
    }
})

module.exports = { userRouter }