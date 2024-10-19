const mongoose = require('mongoose');
// const url = 'mongodb://gayatri31prasad:mongo31gpv/task_management';
// const url = "mongodb+srv://gayatri31prasad:mongo31gpv@cluster0.mongodb.net/task_management?retryWrites=true&w=majority";
// mongodb+srv://<username>:<password>@firstcluster.4rc4s.mongodb.net/<dbname>?retryWrites=true&w=majority
const url = "mongodb+srv://gayatri31prasad:mongo31gpv@cluster0.kxkkepd.mongodb.net/task_management";

mongoose.connect(url)
    .then((ans) => {
        console.log("Connected  successfully")
    })
    .catch((err) => {
        console.log("Error in the Connection", err)
    })

const Schema = mongoose.Schema

const user = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Unique index. If you specify `unique: true`
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: props => `Enter valid email!`
            //   message: props => `${props.value} is not a valid phone number!`
        },
    },
    mobileNumber: {
        type: Number,
        require: true,
        unique: true, // Unique index. If you specify `unique: true` 
        validate: {
            validator: function (v) {
                return /\d{8,11}/.test(v);
            },
            message: props => `Enter valid phone number!`
            //   message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, 'User phone number required']
    },
    gender: String,
    password: {
        type: String,
        require: true
    },
});
const Users = mongoose.model("Users", user)

const category = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
})
const Categories = mongoose.model("Categories", category)

const task = Schema({
    taskName: {
        type: String,
        required: true
    },
    description: String,
    status: {
        type: String,
        required: true,
    },
    dueDate: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
})
const Tasks = mongoose.model('Tasks', task)

module.exports = { Users, Categories, Tasks };