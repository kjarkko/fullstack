const router = require('express').Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/new', async (req, res, next) => {
	try{
    const body = req.body
    const nsalt = 10
    const pwhash = await bcrypt.hash(body.password, nsalt)

    const user = new User({
      username: body.username,
      passwordHash: pwhash
    })
    const savedUser = await user.save()
    res.json(savedUser)
  }catch(ex){
    next(ex)
  }
})

router.post('/login', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })
  const passwordCorrect = (user === null) ? 
    false : await bcrypt.compare(body.password, user.passwordHash)

  if(!(user || passwordCorrect))
    return response.status(401).json({error: 'invalid username or password'})

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username })
})

module.exports = router