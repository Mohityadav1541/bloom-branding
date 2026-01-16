const mongoose = require('mongoose');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const log = (msg) => {
    fs.appendFileSync('db_status.txt', msg + '\n');
    console.log(msg);
};

log("Starting DB check at " + new Date().toISOString());

if (!process.env.DATABASE_URL) {
    log("DATABASE_URL missing");
    process.exit(1);
}

log("Connecting to " + process.env.DATABASE_URL.substring(0, 15) + "...");

mongoose.connect(process.env.DATABASE_URL)
    .then(async () => {
        log("Connected!");
        const Project = require('./models/Project');
        const count = await Project.countDocuments();
        log("Project count: " + count);
        process.exit(0);
    })
    .catch(err => {
        log("Error: " + err.message);
        process.exit(1);
    });
