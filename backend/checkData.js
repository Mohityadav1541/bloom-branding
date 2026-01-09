const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Service = require('./models/Service');

dotenv.config();

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");

        const projects = await Project.find({});
        console.log(`Found ${projects.length} projects:`);
        projects.forEach(p => console.log(` - ${p.title} (ID: ${p._id})`));

        const services = await Service.find({});
        console.log(`Found ${services.length} services:`);
        services.forEach(s => console.log(` - ${s.title}`));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
