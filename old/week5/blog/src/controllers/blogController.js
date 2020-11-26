const router = require('express').Router()
const Blog = require('../models/blogModel')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


router.get('/', (request, response) => {
	Blog
    .find({})
    .populate('user')
		.then(blogs => {
			response.json(blogs.map(b => b.toJSON()))
		})
})
    

const getToken = req => {
  const auth = req.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer '))
    return auth.substring(7)
  else
    return null
}  

const auth = async req => {
  const token = getToken(req)
  let usr = null

  try{
    const decoded = jwt.verify(token, process.env.SECRET)
    if(token && decoded.id)
      usr = await User.findById(decoded.id)
  }catch(e){  }

  return usr
}

router.post('/', async (req, res) => {
  const usr = await auth(req)
  if(!usr){
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const blog = req.body
  blog.user = usr.id
  new Blog(blog)
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})

router.delete('/:id', async (req, res, next) => {
  const id = req.params.id
  const blog = await Blog.findById(id)
  const usr = await auth(req)
  if (!blog || !usr || blog.user != usr.id)
    return res.status(401).json({ error: 'not authorized to delete' })

  try{
    Blog.findByIdAndDelete(id)
    response.status(204).end()
  }catch(e){next(e)}
})

module.exports = router