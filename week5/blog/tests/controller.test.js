const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../src/app')
const api = supertest(app)
const Blog = require('../src/model')
const helper = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})
  await helper.blogs.forEach(blog => new Blog(blog).save())
})

beforeEach(async () => {
})

describe('get', () => {

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('correct amount of blogs returned', async () => {
    const res = await api.get('/api/blogs')
    expect(res.body.length).toBe(helper.blogs.length)
  })
})

describe('post', () => {

  test('post is accepted', async () => {
    const blog = {}
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
  })

  test('post adds new object', async () => {
    let res = await api.get('/api/blogs')
    const len = res.body.length
    const blog = {}
    await api
      .post('/api/blogs')
      .send(blog)
    res = await api.get('/api/blogs')
    expect(res.body.length).toBe(len + 1)
  })
})

describe('delete', () => {

})

afterAll(() => {mongoose.connection.close()})