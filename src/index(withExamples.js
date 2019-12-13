const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task');
const userRouter = require('../src/routers/user');
const taskRouter = require('../src/routers/task');
const app = express()
const port = process.env.PORT || 3000
const multer = require('multer');

// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         // if (!file.originalname.endsWith('.pdf')) {
//         if (!file.originalname.match(/\.(doc|docx)$/)) {
//             return cb(new Error('Please upload a word document!'));
//         }
//         cb(undefined, true);

//         // cb(new Error('File must be a PDF'));
//         // cb(undefined, true)
//         // cb(undefined, false)
//     }
// })
// // const errorMiddleware = (req, res, next) => {
// //     throw new Error('from my middleware');
// // }
// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
// })




app.use(express.json())
app.use(userRouter);
app.use(taskRouter);

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     const data = jwt.verify(token, 'thisismynewcourse')
// }

// myFunction()

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const main = async () => {
//     // const task = await Task.findById('5df0c4745c989f435c8d8cba');
//     // await task.populate('owner').execPopulate()

//     // console.log(task.owner);

//     const user = await User.findById('5df0dda1ecc0e64bb90bb2ec');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);  

// }
// main()