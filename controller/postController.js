const Post = require('../models/Post')
const fs = require('fs')

class PostControl  {  
    showPosts = async (req,res) => {
        const page = req.query.page || 1
        const postPerPage = 2
        const totalPost = await Post.find().countDocuments()
        const posts = await Post.find()
        .sort('-dateCreated')
        .skip((page - 1) * postPerPage)
        .limit(postPerPage)

        res.render('index',{
            posts,
            currentPage: page,
            totalPage: Math.ceil(totalPost / postPerPage)
        })
    }
    getPost = async (req,res) => {
        const postData = await Post.findById(req.params.id)
        res.render('post',{
            postData
        })
    }

    createPost = async (req,res) => {
        let uploadedImage = req.files.image
        let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name
        
        uploadedImage.mv(uploadPath, async () => {
            await Post.create({
                ...req.body,
                image: '/uploads/' + uploadedImage.name
            })        
             res.redirect('/')
        })
    }

    postUpdate = async (req,res) => {
        const post = await Post.findOne({_id:req.params.id})
        post.title = req.body.title
        post.description = req.body.description
        post.save()
        res.redirect(`/post/${req.params.id}`)
    }

    deletePost = async(req,res) => {
        const postData = await Post.findOne({_id:req.params.id})
        let deletedPhoto = __dirname + '/../public' + postData.image
        if(postData.image !== '') {
            fs.unlinkSync(deletedPhoto)
        }
        await Post.findByIdAndRemove(req.params.id)
        res.redirect('/')
    }

    getEditData = async (req,res) => {
        const editData = await Post.findOne({_id:req.params.id})
        res.render('edit-post', {
            editData
        })
    }

}

exports.postControl = new PostControl()


