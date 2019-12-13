// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID;

const { MongoClient, ObjectID } = require('mongodb');
const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID();
console.log(id.toHexString().length);

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    console.log('Connected Correctly');
    const db = client.db(databaseName)

    const updatePromise = db.collection('users').updateOne({ _id: new ObjectID("5de4a39deb70c52a426f3414") }, {
        $inc: {
            age: 1
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.matchedCount);
    }).catch((error) => {
        console.log(error);
    })

    db.collection('tasks').deleteMany({
        description: "taskk 1"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
    db.collection('tasks').deleteOne({
        description: "taskk 2"
    }).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })
})