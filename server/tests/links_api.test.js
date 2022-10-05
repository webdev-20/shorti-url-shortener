const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')

const api = supertest(app)

test('links are returned as json', async() =>{
    await api
        .get('/api/links')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(async ()=>{
    await mongoose.connection.close()
})