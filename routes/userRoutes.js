const {UserModel} = require('../models/Users.model')
const express = require('express')
const userRouter = express.Router()

userRouter.get("/", async (req, res) => {
    let query = req.query
    try {
        const users = await UserModel.find(query)
        res.send([users])
    }
    catch (error) {
        res.send({ "msg": "Cannot get the users" })
    }
})

userRouter.patch("/update/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    try {
        await UserModel.findByIdAndUpdate({_id:ID},payload)
        res.send({"msg":"Updated the User"})
    } catch (err) {
        res.send({ "msg": "Cannot update the user", "error": err.message })
    }
})

userRouter.delete("/delete/:id", async (req, res) => {
    const ID = req.params.id;
    const payload = req.body
    try {
        await UserModel.findByIdAndDelete({_id:ID},payload)
        res.send({"msg":"Deleted the User"})
    } catch (err) {
        res.send({ "msg": "Cannot delete the user", "error": err.message })
    }
})

module.exports={userRouter}