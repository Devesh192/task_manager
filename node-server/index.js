const express = require('express');
const cors = require('cors');
const server = express();
const moongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');  //middleware

server.use(cors()); //middlewares
server.use(bodyParser.json());
const mongoose = require('mongoose');

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Connected to database');
}

//schemas 
const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
});
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    tasks: [taskSchema],
})

const User = mongoose.model('User', userSchema);
//register endpoint
server.post('/demo', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = new User();
    user.username = req.body.username;
    user.password = hashedPassword;
    const doc = await user.save();
    console.log(req.body, res.body);
    res.json(req.body);
});

// Login endpoint
server.post('/login', async (req, res) => {
    const { username, password, task } = req.body;
    console.log(username, password);

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid credentials' + user.password);
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(
            payload,
            'yourSecretKey', // Replace with your own secret key
            { expiresIn: '1h' }, // Token expires in 1 hour
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
        res.send({ username : user.username });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Add task endpoint
server.post('/add-task/:username', async (req, res) => {
    const { name, description } = req.body;
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const newTask = {
            name,
            description,
        };
        user.tasks.push(newTask);
        await user.save();

        res.json({ message: 'Task added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

//route for fetching tasks related to a user
server.post('/tasks/:username', async (req, res) => {
    try {
        const userId = req.params.username;
        const user = await User.findOne({username :  userId }); 
       
        res.json({user});
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});

server.post('/deleteTask/:username/:taskId', async (req, res) => {
    try {
        const { username, taskId } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const taskIndex = user.tasks.findIndex(task => task._id.toString() === taskId);
        if (taskIndex === -1) {
            return res.status(404).json({ message: 'Task not found' });
        }
        user.tasks.splice(taskIndex, 1);
        await user.save();

        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

server.listen(8081, () => {
  console.log('Server is running on port 8081');
});