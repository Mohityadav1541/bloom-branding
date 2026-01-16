const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

console.log("Checking environment...");
if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing!");
    process.exit(1);
}
console.log("DATABASE_URL found (length: " + process.env.DATABASE_URL.length + ")");

console.log("Connecting to DB...");
mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log("Connected successfully!");
        process.exit(0);
    })
    .catch(err => {
        console.error("Connection failed:", err);
        process.exit(1);
    });
