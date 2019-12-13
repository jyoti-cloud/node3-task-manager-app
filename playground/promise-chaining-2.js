require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5de8ad0e04d6fc1d17ddd6ec').then((task) => {
//     console.log(task);
//     return Task.countDocuments({ completed: false });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('5de64ab1f924e94c6bf3133f').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);

})