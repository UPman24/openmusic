const express = require('express')
const app = express()
const port = 14521
const User = require("./components/user/user");

// app.use(express.urlencoded({extended:false}))
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ extended: true, limit: "10mb" }));

app.use(express.json());

// 1.用户模块
app.use('/user', User);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
})
