const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs')
const fs = require('fs')
const postController = require('./controller/postController')

mongoose.connect('mongodb://127.0.0.1:27017/photo-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const app = express()

const uploadDir = 'public/uploads'

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

// TEMPLATE ENGINE
app.set('view engine','ejs')

// MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload())
app.use(methodOverride('_method', {
    methods: ['POST','GET']
}))

// ROUTES
app.get('/', postController.postControl.showPosts)
app.get('/post/:id', postController.postControl.getPost)
app.post('/post-add', postController.postControl.createPost)
app.put('/post/edit/:id', postController.postControl.postUpdate)
app.delete('/post/:id', postController.postControl.deletePost)
app.get('/post/edit/:id', postController.postControl.getEditData)

app.get('/add-post',(req,res) => {
    res.render('add-post')
})
app.get('/about',(req,res) => {
    res.render('about')
})




app.listen(3000)