const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs'); // Added bcrypt
const Project = require('./models/Project');
const Service = require('./models/Service');
const User = require('./models/User'); // Added User model

dotenv.config();

const projects = [
    {
        title: "Jewellery Brands",
        category: "Jewellery",
        description: "Premium gemstone branding and visual identity for leading manufacturers.",
        image: "/images/portfolio-jewellery.png", // Pointing to local frontend
        subProjects: ["Dhruv Gems", "AMBC Gems", "Vardhaman Diam", "Sapphiri"]
    },
    {
        title: "Fashion & Couture",
        category: "Fashion",
        description: "Contemporary and traditional fashion label positioning.",
        image: "/images/portfolio-fashion.png",
        subProjects: ["The Right Cut", "Binal Patel", "SubhRekha", "Mansi Nagdev"]
    },
    {
        title: "Lifestyle Collection",
        category: "Lifestyle",
        description: "Vibrant branding for accessories and lifestyle products.",
        image: "/images/portfolio-accessories.png",
        subProjects: ["Life's A Beach", "ShoP", "B'there Innerwear"]
    },
    {
        title: "Hospitality & Dining",
        category: "Hospitality",
        description: "Culinary brand experiences and cafe identities.",
        image: "/images/portfolio-cafe.png",
        subProjects: ["Thyme & Whisk", "Kaffyn", "Amar – Fastfood Center"]
    },
];

const services = [
    {
        title: "Brand Strategy",
        description: "We dive deep into your brand's DNA to craft a distinctive positioning that resonates with your target audience and sets you apart from competition.",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
        features: ["Brand Audit & Analysis", "Market Research", "Competitive Positioning", "Brand Architecture", "Messaging Framework"],
        icon: "Target",
        color: "from-primary to-accent"
    },
    {
        title: "Visual Identity",
        description: "From logo design to complete visual systems, we create cohesive brand identities that communicate your values and captivate your audience.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=80",
        features: ["Logo Design", "Color Systems", "Typography Selection", "Brand Guidelines", "Collateral Design"],
        icon: "Palette",
        color: "from-accent to-secondary"
    },
    {
        title: "Content Creation",
        description: "Compelling visual content that tells your story across all platforms. We create scroll-stopping imagery that drives engagement and builds community.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
        features: ["Photography Direction", "Social Media Content", "Editorial Shoots", "Product Photography", "Campaign Assets"],
        icon: "Camera",
        color: "from-secondary to-bloom-gold"
    },
    {
        title: "Production",
        description: "High-quality video and motion content that brings your brand to life. From concept to final cut, we deliver cinematic storytelling.",
        image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&auto=format&fit=crop&q=80",
        features: ["Brand Films", "Commercial Production", "Motion Graphics", "Documentary Style", "Event Coverage"],
        icon: "Film",
        color: "from-bloom-gold to-bloom-sage"
    },
    {
        title: "Social Media Branding",
        description: "Strategic social presence that builds authentic connections. We help you create a consistent voice that resonates across all platforms.",
        image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&auto=format&fit=crop&q=80",
        features: ["Content Strategy", "Community Management", "Influencer Partnerships", "Analytics & Insights", "Growth Campaigns"],
        icon: "Share2",
        color: "from-bloom-sage to-primary"
    },
    {
        title: "Digital Experiences",
        description: "Frontend-focused digital solutions with bold animations and memorable interactions. We create websites that leave lasting impressions.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
        features: ["Website Design", "Interactive Animations", "UX/UI Design", "Landing Pages", "Digital Campaigns"],
        icon: "Sparkles",
        color: "from-primary to-bloom-rose"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to DB");

        // Seed Projects
        console.log("Seeding Projects...");
        await Project.deleteMany({});
        await Project.insertMany(projects);
        console.log("Projects Seeded");

        // Seed Services
        console.log("Seeding Services...");
        await Service.deleteMany({});
        await Service.insertMany(services);
        console.log("Services Seeded");

        // Seed Admin User
        console.log("Seeding Admin User...");
        await User.deleteMany({}); // Clear existing users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("1234", salt); // New password

        const adminUser = new User({
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        await adminUser.save();
        console.log("Admin User Seeded");
        console.log("Credentials -> Email: admin@gmail.com | Password: 1234");

        console.log("Seeding Done!");
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
