const express = require('express')
const { connection } = require('./db')
const {UserModel} = require('./models/Users.model')
const jwt = require('jsonwebtoken')
const {userRouter} = require('./routes/userRoutes')

const app = express()

app.use(express.json())
app.use('/users',userRouter)

app.get("/", (req, res) => {
    const token = req.headers.authorization
    jwt.verify(token,/*key :  */'Mohit Raj Singh', (err, decoded) => {
        if (decoded) {
            res.send({ "msg": "Home Page " })
        } else {
            res.send({ "msg": "Some thing went wrong", "error": err.message })
        }
    })
})


app.post('/login', async (req, res) => {
    const { email, pass } = req.body
    const token = jwt.sign({ course: 'backend' }, 'Mohit Raj Singh')
    try {
        const user = await UserModel.find({ email, pass })
        if (user.length > 0) {
            res.send({ "msg": "Login Successfull", "token": token })
        }
        else {
            res.send({ "msg": "Wrong Credentials" })
        }
    }
    catch (error) {
        res.send({ "msg": "Login Unsuccessfull" })
    }
})

app.post("/register", async (req, res) => {
    const userDetail = req.body
    try {
        const user = new UserModel(userDetail)
        await user.save()
        res.send({ "msg": "User Registered" })
    } catch (error) {
        console.error(error);
        res.send({ "msg": "Cannot register", "error": error.message })
    }
})

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log("COnnected to DB");
    }
    catch (err) {
        console.log(err)
    }
    console.log("Server chala diya be");
})