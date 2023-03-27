import mongoose from 'mongoose'
const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/photo-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PhotoSchema = new Schema({
    title:String,
    description:String
})

const Photo = mongoose.model('Photo',PhotoSchema)

Photo.create({
    title: 'Photo Title 1',
    description: 'Photo description 1 lorem ipsum',
})



