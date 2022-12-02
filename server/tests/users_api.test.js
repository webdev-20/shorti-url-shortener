const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken')
const app = require('../app');
const User = require('../src/models/User');
const helper = require('./test_helper');


require("dotenv").config();

const api = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {dbName: 'testDb'});
});

beforeEach(async () => {
    await User.deleteMany({});

    const user = new User({email: 'pretzel@example.com', password: 'secret'});
    await user.save();
});

describe('POST /api/users/signup - user signup', () => {
    test('a user can be created with a new username', async () => {
        const usersAtStart = await helper.getAllUsersInDB()

        const newUser = {
            email: 'wilk@example.com',
            password: 'apassword',
            confirmPassword: 'apassword'
        }

        const response = await api
            .post('/api/users/signup')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(true)

        const usersAtEnd = await helper.getAllUsersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

        const emails = usersAtEnd.map(u=>u.email)
        expect(emails).toContain(newUser.email)
    });


    test('signup fails if email already exist', async () => {
        const usersAtStart = await helper.getAllUsersInDB()

        const newUser = {
            email: 'pretzel@example.com',
            password: 'apassword',
            confirmPassword: 'apassword'
        }

        const response = await api
            .post('/api/users/signup')
            .send(newUser)
            .expect(409)
            .expect('Content-Type', /application\/json/);

        const usersAtEnd = await helper.getAllUsersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        expect(response.body.success).toBe(false)
    });

    test('signup fails if passwords do not match', async () => {
        const usersAtStart = await helper.getAllUsersInDB()

        const newUser = {
            email: 'wilk@example.com',
            password: 'apassword',
            confirmPassword: 'adifferentpassword'
        }

        const response = await api
            .post('/api/users/signup')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(false)

        const usersAtEnd = await helper.getAllUsersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        expect(response.body.success).toBe(false)
    });

    test('signup fails if passwords is too short', async () => {
        const usersAtStart = await helper.getAllUsersInDB()

        const newUser = {
            email: 'wilk@example.com',
            password: 'a',
            confirmPassword: 'a'
        }

        const response = await api
            .post('/api/users/signup')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(false)

        const usersAtEnd = await helper.getAllUsersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        expect(response.body.success).toBe(false)
    });

    test('signup fails if email is invalid', async () => {
        const usersAtStart = await helper.getAllUsersInDB()

        const newUser = {
            email: 'wilk',
            password: 'apassword',
            confirmPassword: 'apassword'
        }

        const response = await api
            .post('/api/users/signup')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(false)

        const usersAtEnd = await helper.getAllUsersInDB()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        expect(response.body.success).toBe(false)
    });
});

describe('POST /api/users/login - user login', () => {
    test('login successful and a token is returned', async () => {
        const user = {
            email: 'pretzel@example.com',
            password: 'secret'
        }
        const response = await api
            .post('/api/users/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(true)
        const token = response.body.token

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET)

        expect(verifyToken).toBeDefined()

    })

    test('login fails if email doesnt exist', async () => {
        const user = {
            email: 'notexist@example.com',
            password: 'secret'
        }
        const response = await api
            .post('/api/users/login')
            .send(user)
            .expect(500)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(false)

    })

    test('login fails if email and password do not match', async () => {
        const user = {
            email: 'pretzel@example.com',
            password: 'secret2'
        }
        const response = await api
            .post('/api/users/login')
            .send(user)
            .expect(500)
            .expect('Content-Type', /application\/json/);

        expect(response.body.success).toBe(false)
    })
})

//TODO: tests for delete endpoint
/*
describe('GET /api/users/logout - user login', () => {
    test('logout successful and the token is deleted', async () => {

    })

    test('logout fails if the user is not logged in', async () => {

    })
})
 */

afterAll(async () => {
    await mongoose.connection.close();
});