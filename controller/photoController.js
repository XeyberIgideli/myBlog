const Photo = require('../models/Photo')
const fs = require('fs')

class PhotoControl  {  
    showData = async (req,res) => {
        const page = req.query.page || 1
        const postPerPage = 2
        const totalPost = await Photo.find().countDocuments()
        const posts = await Photo.find()
        .sort('-dateCreated')
        .skip((page - 1) * postPerPage)
        .limit(postPerPage)

        res.render('index',{
            posts,
            currentPage: page,
            totalPage: Math.ceil(totalPost / postPerPage)
        })
    }
    getPhoto = async (req,res) => {
        const photoData = await Photo.findById(req.params.id)
        res.render('photo',{
            photoData
        })
    }

    uploadImage = async (req,res) => {
        let uploadedImage = req.files.image
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name
        
        uploadedImage.mv(uploadPath, async () => {
            await Photo.create({
                ...req.body,
                image: '/uploads/' + uploadedImage.name
            })        
             res.redirect('/')
        })
    }

    photoUpdate = async (req,res) => {
        const photo = await Photo.findOne({_id:req.params.id})
        photo.title = req.body.title
        photo.description = req.body.description
        photo.save()
        res.redirect(`/photo/${req.params.id}`)
    }

    deleteData = async(req,res) => {
        const photoData = await Photo.findOne({_id:req.params.id})
        let deletedPhoto = __dirname + '/../public' + photoData.image
        if(photoData.image !== '') {
            fs.unlinkSync(deletedPhoto)
        }
        await Photo.findByIdAndRemove(req.params.id)
        res.redirect('/')
    }

    getEditData = async (req,res) => {
        const editData = await Photo.findOne({_id:req.params.id})
        res.render('edit-photo', {
            editData
        })
    }

}

exports.photoControl = new PhotoControl()


