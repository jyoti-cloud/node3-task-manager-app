const app = require('../src/app')
const request = require('supertest');
const Task = require('../src/models/task');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');
beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'from my test'
        }).expect(201);
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})
// test get tasks

test('Should get tasks created by userOne', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
        expect(response.body.length).toEqual(3);
})