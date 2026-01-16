const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project'); // Adjust path if needed
const Service = require('./models/Service'); // Adjust path if needed

dotenv.config();

// Simple model definitions if requiring them fails (though they should exist)
// We'll rely on current file structure: backend/models/Project.js and Service.js exist.

const checkContent = async () => {
    try {
        if (!process.env.DATABASE_URL) {
            console.error("DATABASE_URL not found in .env");
            // Hardcode or ask user? We can't proceed without it.
            // But if we run this via `node backend/checkContent.js` it might pick up the .env if we are in root.
            console.log("Checking process.env:", process.env.DATABASE_URL ? "URL Present" : "URL Missing");
        }

        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");

        const projects = await Project.find({});
        console.log(`Projects found: ${projects.length}`);
        if (projects.length > 0) console.log(projects.map(p => p.title));

        const services = await Service.find({});
        console.log(`Services found: ${services.length}`);
        if (services.length > 0) console.log(services.map(s => s.title));

        process.exit();
    } catch (err) {
        console.error("Error:", err.message);
        process.exit(1);
    }
};

checkContent();
