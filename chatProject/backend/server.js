require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const mongoURL = process.env.MONGO_URI
const app = express();
const cors = require('cors')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const UserCred = require('./models/umodel');
const Qna = require('./models/qnamodel');
const History = require('./models/historymodel');

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURL)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Connected to db & Listening on Port", process.env.PORT)
    })
})
.catch((error)=>{
    console.log("failed");
    console.log(error);
})

app.post("/register", async (req, res)=>{
    try{    
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await UserCred.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
			usertype: req.body.utype
        })
        res.json({status: 'ok'});
    }
    catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post("/login", async (req, res)=>{
    const user = await UserCred.findOne({
		email: req.body.email,
	})
    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}
    const checkPass = await bcrypt.compare(
		req.body.password,
		user.password
	)
    if (checkPass) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
				utype: user.usertype
			},
			process.env.JWT_SECRET
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get("/questions", async (req, res) => {
	const data = await Qna.find({});
	
	res.json(data);
})

app.post("/history", async (req, res) => {
	await History.create({
		email: req.body.email,
		question: req.body.question,
		answer: req.body.answer
	})
	res.send({status:"ok"})
})

app.post("/gethistory", async (req, res) => {
	const userEmail = req.body.email
	const userHistory = await History.find({email: userEmail}).sort({createdAt: 'asc'})
	const uArray = userHistory.map((item)=>{
		return {
			question: item.question,
			answer: item.answer
		}
	})
	const returnObj = {
		data: uArray
	}
	res.json(returnObj)
})

// app.delete("/clearHistory", async (req, res) => {
// 	await History.deleteMany({email: req.body.email})
// 	res.send("ok");
// })

app.post("/updateqna", async (req, res) => {
	await Qna.findOneAndUpdate({ question: req.body.nuq }, { answer: req.body.nua }, { upsert: true })
	res.send("ok");
})