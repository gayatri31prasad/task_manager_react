const { hashPassword, createJWTToken, checkPassword } = require('./constants/constantFinction');
const { authenticate } = require('./middleware/authMiddleware');
const { Users, Categories } = require('./schema/userSchema');
const express = require('express'),
    bodyParser = require('body-parser'),
    app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', async(req, res) => {
    try {        
        // console.log(req.body)
        const {email, password} = req.body;
        if (email) {
        const userData = await Users.findOne({ email: email }).exec()
        if (userData) {
            const passwordCheck = await checkPassword(password,userData.password)
            const userToken = createJWTToken({ userId: userData._id })
            if(passwordCheck){
                res.json({
                    SUCCESS: true,
                    TOKEN: userToken,
                    DATA: {...userData, _id:0, userId: userData._id},
                })
            }else{
                res.status(403).json({
                    SUCCESS: false,
                    message: "Invalid username or password"
                })
            }
        }
    }
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map(value => value.message);
            return res.status(400).json({
                //     SUCCESS: false,
                error: message
            })
        }
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.post('/signup', async (req, res) => {
    try {
        const { userName, email,mobileNumber, gender, password } = req.body
        // if(userName || email || mobileNumber || gender || password) { return }
        const hashPassword = await hashPassword(password)
        const signUpData = {
            userName,
            email,
            mobileNumber,
            gender,
            password: hashPassword
        }
        // console.log(signUpData);
        const user = new Users({ ...signUpData })
        const userData = await user.save()

        const userToken = createJWTToken({ userId: userData._id })
        // console.log('createJWTToken...', userToken);

        res.json({
            SUCCESS: true,
            TOKEN: userToken,
            DATA: {...userData, _id:0, userId: userData._id},
        })
    } catch (error) {
        console.log(error);
        if (error.name === "ValidationError") {
            const message = Object.values(error.errors).map(value => value.message);
            return res.status(400).json({
                //     SUCCESS: false,
                error: message
            })
        }
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
});

app.post('/logout', authenticate, (req, res) => {

});

app.get('/task', authenticate, (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.post('/task', authenticate, (req, res) => {
    try {
        const taskData = {
            taskName: '',
            description: '',
            status: '',
            dueDate: '',
            categoryId: '',
        }
        
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.put('/task/:taskId', authenticate, (req, res) => {
    try {
    const taskData = {
        taskId: '',
        taskName: '',
        description: '',
        status: '',
        dueDate: '',
        categoryId: '',
    }
        
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.delete('/task/:taskId', authenticate, (req, res) => {
    try {
        
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.get('/categories',authenticate, async(req, res) => {
    try {
        // console.log(req.user);        
        const categoryData = await Categories.find({});
        // console.log('category.....',categoryData);        
        res.json({
            SUCCESS: true,
            DATA: categoryData.filter(item=>item).map((value)=>({categoryName:value.categoryName , categoryId: value._id}))
        })
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.post('/categories', authenticate, async (req, res) => {
    try {
        // const categoryData={
        //     categoryName:'',
        // }
        const category = new Categories({
            categoryName: req.body?.categoryName,
        })
        const categoryData = await category.save()
        res.json({
            SUCCESS: true,
            DATA: categoryData
        })
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.put('/categories', authenticate, async(req, res) => {
    try {
        const query = { categoryId: req.body.categoryId };
        const updatedCategory =Categories.findOneAndUpdate(query, { categoryName })
        res.json({
            SUCCESS: true,
            DATA: categoryData
        })
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.delete('/categories/:categoryId', authenticate, async(req, res) => {
    try {
        const categoryId = req.params.category
        const deleteCategory = await Categories.findOneAndDelete({_id: categoryId, createdBy: req.user.userId})
        res.json({
            SUCCESS: true,
            DATA: deleteCategory
        })
    } catch (error) {
        res.status(400).json({
            SUCCESS: false,
            error: error.message
        })
    }
})

app.listen(9090, () => {
    console.log('node js is running on port http://localhost:9090');
})