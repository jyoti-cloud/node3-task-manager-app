const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = require('../src/app')
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')
beforeEach(setupDatabase)



//1
test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Anhad Kunjar',
        email: 'anhadkunj@gmail.com',
        password: 'mypass142!'
    }).expect(201);
    //assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
    //assertion about the response
    expect(response.body.user.name).toBe('Anhad Kunjar');
    //assertion about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Anhad Kunjar',
            email: 'anhadkunj@gmail.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('mypass142!')
})
//2
test('Should login existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200);
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token)
})
//3
test('should not login nonexistent user', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'dsdsdsadasdasdasdas'
    }).expect(400);
})
//4
test('should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
})
//5
test('should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401);
})
//6
test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).toBeNull()
})
//7
test('Should not  delete account for unauthorized user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401);
})
//8
test('should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200);
    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'jyoti'
        }).expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toEqual('jyoti');
})
test('Should not update invalid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'noida'
        })
        .expect(400)
})