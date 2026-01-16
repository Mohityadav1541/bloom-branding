const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");

        const users = await User.find({});
        if (users.length === 0) {
            console.log("No users found.");
        } else {
            console.log("Users found:", users.map(u => ({ username: u.username, id: u._id })));
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();
