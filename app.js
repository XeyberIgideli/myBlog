const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const ejs = require('ejs')
const fs = require('fs')
const photoController = require('./controller/photoController')

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
app.get('/', photoController.photoControl.showData)
app.get('/photo/:id', photoController.photoControl.getPhoto)
app.post('/photos', photoController.photoControl.uploadImage)
app.put('/photo/edit/:id', photoController.photoControl.photoUpdate)
app.delete('/photo/:id', photoController.photoControl.deleteData)
app.get('/photo/edit/:id', photoController.photoControl.getEditData)

app.get('/add-photo',(req,res) => {
    res.render('add-photo')
})
app.get('/about',(req,res) => {
    res.render('about')
})




app.listen(3000)