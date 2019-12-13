require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5de8a6f4cae04a19773ebad7', { age: 15 }).then((user) => {
    console.log(user);
    return User.countDocuments({ age: 15 })
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e)
})

const updateAgeAndCount = async (id, age) => {
    const user = await findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('5de8a6f4cae04a19773ebad7', 2).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})