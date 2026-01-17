const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        // --- REAL AI IMPLEMENTATION (GOOGLE GEMINI) ---
        // For text-only input, use the gemini-pro model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
        You are 'Bloom', the AI assistant for Bloom Studio, a premium creative digital agency.
        Agency Details:
        - Services: Branding (Logo, Strategy), Web Design (UI/UX, Development), Digital Marketing (SEO, Social Media), Content Creation.
        - Location: Mumbai, Maharashtra, India.
        - Contact: hello@bloombranding.com, +91 98765 43210.
        - Tone: Professional, creative, helpful, concise, and friendly.

        User Question: "${message}"

        Provide a helpful and concise response as Bloom. If you don't know the answer, politely ask them to contact the team.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return res.json({ reply: text });

    } catch (error) {
        console.error("Chat API Error:", error);

        // --- FALLBACK TO RULE-BASED IF API FAILS (e.g., Key missing) ---
        const lowerMsg = message.toLowerCase();
        let reply = "I'm currently experiencing high traffic. Please contact our team directly at hello@bloombranding.com.";

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            reply = "Hello! Welcome to Bloom Studio. How can I assist you with your digital needs today?";
        } else if (lowerMsg.includes('service') || lowerMsg.includes('work') || lowerMsg.includes('offer')) {
            reply = "We offer a range of services including Branding, Web Design, Digital Marketing, and Content Creation.";
        } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
            reply = "You can reach us at hello@bloombranding.com or call us at +91 98765 43210.";
        }

        res.json({ reply });
    }
});

module.exports = router;
